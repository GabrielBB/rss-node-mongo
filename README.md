# rss-node-mongo

RNM is a Node JS module to request and parse a RSS feed and save the contents to Mongo DB. It makes sure only the new content is appended to your collection. You only provide the RSS URI and your database connection string and it is done.


## Usage

```javascript
const RSSToMongo = require('rss-node-mongo');

const rss = new RSSToMongo(properties)

rss.work(function (err, success) {
    if (!err) {
         console.log(success.saved + "/" + success.total + " items were saved")
    } else {
         console.error(err)
    }
})
```

**properties**

 - `rss`: The RSS URL
 
 - `db`: The mongo db connection string (if not provided it creates a database named "rss" under mongodb://localhost:27017)
 
 - `collection`: Name for the collection where items will be saved (if not provided then it creates a collection named "feeds")

### Installation

Install the dependency
``` sh
npm install rss-node-mongo
```