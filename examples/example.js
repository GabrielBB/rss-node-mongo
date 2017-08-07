const RSSToMongo = require('../rss-node-mongo');
const props = require('./properties'); // properties.json located in the same folder

const rss = new RSSToMongo(props)

rss.work(function (err, success) {
    if (err) {
        console.error(err)
    } else {
        console.log(success.saved + "/" + success.total + " posts were saved")
        console.log(success.ignored + " elements were already in the database")
    }
})