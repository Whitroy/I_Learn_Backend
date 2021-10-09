import mysql, { Connection } from "mysql";
require("dotenv").config();

export class DBService {
	private static _instance: DBService;
	private connection: Connection;

	constructor() {
		this.connection = mysql.createConnection({
			host: process.env.SQL_HOST,
			user: process.env.SQL_DATABASE_USER,
			password: process.env.SQL_DATABASE_PASSWORD,
			database: process.env.SQL_DATABASE_NAME,
		});

		this.connection.connect((err, con) => {
			if (err.code === "PROTOCOL_CONNECTION_LOST") {
				console.error("Database connection was closed.");
			}
			if (err.code === "ER_CON_COUNT_ERROR") {
				console.error("Database has too many connections.");
			}
			if (err.code === "ECONNREFUSED") {
				console.error("Database refused");
			}

			if (con) console.log("MySQL Connected!");
		});
	}

	static getInstance() {
		if (!this._instance) this._instance = new DBService();
		return this._instance;
	}
}
