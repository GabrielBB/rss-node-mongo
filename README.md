# rss-node-mongo

![see module on NPM](https://nodei.co/npm/rss-node-mongo.png?downloads=true&downloadRank=true&stars=true)

RNM is a Node JS module to request and parse RSS feeds and save the contents to Mongo DB. It makes sure only the new content is appended to your collection. You only provide the RSS URI and your database connection string and it is done.

Important Note: This module is only for version 8 of Node JS. We are working on a new version with backward compatibility
 
## Usage

```javascript
const RSSToMongo = require('rss-node-mongo');

const rss = new RSSToMongo(properties)

rss.work(function (err, success) {
    if (!err) {
         console.log(success.saved + " items were inserted")
    } else {
         console.error(err)
    }
})
```

**properties**

This parameter can have the following properties:

 - `rss`: The RSS URL
 
 - `db`: The mongo db connection string (if not provided it creates a database named "rss" under mongodb://localhost:27017)
 
 - `collection`: Name for the collection where items will be saved (if not provided then it creates a collection named "feeds")

**success**

This object has the following properties: 

 - `saved`: Number of items that were inserted to database
 
 - `total`: Total number of items from the RSS
 
 - `ignored`: Number of items that were ignored because they were already in the database collection

## Further

You can also pass a function as a second parameter of the class that will be called for each retrieved item.
```javascript
const rss = new RSSToMongo(properties, function(item) { 
	// The item will be inserted with the changes you make here to the database. 

	item._id = item.link; // For example, you might want your _id to be something else
	item["PutNewPropertyNameHere"] = "I'm additional": // Or Add an additional property
	// Or remove special characters from the item content
})
```

### Installation

Install the dependency
``` sh
npm install rss-node-mongo
```
