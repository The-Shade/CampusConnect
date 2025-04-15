const { MongoClient } = require('mongodb');
const utils = require('./Utils');

class DatabaseManager {
    db_uri = "";
    constructor() {
        this.client = new MongoClient(this.db_uri);
    }

    // returns status codes: 3, 4
    async connect() {
        try {
            await this.client.connect();
        } catch (e) {
            return {status: 4, error: e};
        }
        return {status: 3, message: "Database connected"};
    }

    // returns status codes: 4, 1003, 1004
    async login (user_data) {
        let connection_status = await this.connect();
        if (connection_status.status === 4) return connection_status;

        let result;
        try {
            result = await this.client.db("CampusConnect").collection("Users").findOne(user_data);
        } catch (e) {
            return {status: 1004, error: e};
        }

        return {status: 1003, userid: result._id};
    }

    // returns status codes: 4, 1007, 1008
    async register (user_data) {
        let connection_status = await this.connect();
        if (connection_status.status === 4) return connection_status;

        let result;

        try {
            result = await this.client.db("CampusConnect").collection("Users").insertOne(user_data);
        } catch (e) {
            return {status: 1008, error: e};
        }
        return {status: 1007, userid: result._id};
    }
}

module.exports = DatabaseManager;