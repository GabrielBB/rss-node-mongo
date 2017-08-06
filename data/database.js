const MongoClient = require('mongodb').MongoClient

class Database {

    constructor(dbConnectionString, collectionName) {
        this.dbConnectionString = dbConnectionString;
        this.collectionName = collectionName;
    }

    async getConnection() {
        return await MongoClient.connect(this.dbConnectionString);
    }

    async savePosts(posts) {
        const conn = await this.getConnection();
        let savedPosts = posts.length;

        try {
            const collection = conn.collection(this.collectionName)

            await collection.insertMany(posts, { ordered: false });
            return savedPosts;
        } catch (err) {
            if (err.code != 11000) {
                throw err; // Is not a duplication error, this is bad, it must be thrown
            }

            savedPosts = (posts.length - err.writeErrors.length);
            return savedPosts;
        }
        finally {
            conn.close();
        }

    }
}


module.exports = Database;

