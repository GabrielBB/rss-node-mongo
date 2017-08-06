const FeedParser = require('feedparser');
const request = require('request');
const Database = require('./data/database');
const Entities = require('html-entities').XmlEntities

class RSSToMongo {

    constructor(props, onItemRead) {
        this.rssURL = props.rss;

        this.dbConnectionString = props.db ? props.db : "mongodb://localhost:27017/rss"; // Use default localhost mongodb if connection string is not provided
        this.collectionName = props.collection ? props.collection : "feeds"; // Use this name for the collection if not collection name was specified

        this.onItemRead = onItemRead;
        this.entries = [];
    }

    work(callback) {
        const req = request(this.rssURL)
        const feedparser = new FeedParser();
        const scrapper = this;

        req.on('error', function (error) {
            callback("Error requesting RSS: " + error)
        });

        req.on('response', function (res) {
            var stream = this; // "this" is "req", which is a stream

            if (res.statusCode !== 200) {
                this.emit('error', new Error('RSS Uri response with bad status code: ' + res.statusCode));
            }
            else {
                stream.pipe(feedparser);
            }
        });

        feedparser.on('error', function (error) {
            callback("FeedParser threw an error: " + error)
        });

        feedparser.on('readable', function () {
            try {
                scrapper.onReadable(this);
            } catch (err) {
                callback('Error parsing feed item: ' + err)
            }
        });

        feedparser.on('finish', function () {
            scrapper.onFeedParsingFinished(callback);
        });
    }

    onReadable(stream) {
        let item;
        while (item = stream.read()) {
            item._id = item.guid;
            
            if (this.onItemRead) {
                this.entries.push(this.onItemRead(item)) // Oh, they wanna do something with each item? Go ahead
            } else {
                this.entries.push(item)
            }

        }
    }

    async onFeedParsingFinished(callback) {
        try {
            let postCount = this.entries.length;
            let savedPosts = 0;
            if (postCount > 0) {
                const database = new Database(this.dbConnectionString, this.collectionName);
                savedPosts = await database.savePosts(this.entries);
            }

            callback(null, { saved: savedPosts, total: postCount, ignored: (postCount - savedPosts) })
        } catch (err) {
            callback('Error trying to save posts to database: ' + err)
        }
    }
}


module.exports = RSSToMongo;