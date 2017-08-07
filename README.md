# rss-node-mongo

RNM is a Node JS module to request and parse a RSS feed and save the contents to Mongo DB. It makes sure only the new content is appended to your collection. You only provide the RSS URI and your database connection string and it is done.


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

You can also pass a function as a second parameter of the class
```javascript
const rss = new RSSToMongo(properties, function(item) { 
	// This function will be called for every item. 
	//You can add, delete and modify properties of each item and it will be inserted with those changes to the database. 
	//For example you might want to have something different as an _id:

	item._id = item.link;

})
```

### Installation

Install the dependency
``` sh
npm install rss-node-mongo
```
