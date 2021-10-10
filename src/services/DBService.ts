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
			if (err?.code === "PROTOCOL_CONNECTION_LOST") {
				console.error("Database connection was closed.");
			} else if (err?.code === "ER_CON_COUNT_ERROR") {
				console.error("Database has too many connections.");
			} else if (err?.code === "ECONNREFUSED") {
				console.error("Database refused");
			} else if (err) {
				console.error(err);
			}

			if (con) console.log("MySQL Connected!");
		});
	}

	static getInstance() {
		if (!this._instance) this._instance = new DBService();
		return this._instance;
	}

	async verifyEmail(email: string, password: string) {
		const query = `SELECT password from user WHERE email='${email}'`;
		try {
			await this.connection.query(query, (error, results, fields) => {
				if (error) {
					console.log(error);
					return false;
				}
				console.log(results[0].password);
				return results[0]?.password === password;
			});
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async getJWSLogin(email: string) {
		const query = `SELECT first_name,id,last_name,email,role from user WHERE email='${email}'`;
		try {
			await this.connection.query(query, (error, results, fields) => {
				if (error) {
					console.log(error);
					return {
						first_name: results[0]?.first_name,
						id: results[0]?.id,
						role: results[0]?.role,
						last_name: results[0]?.last_name,
						email: email,
					};
				}

				return {
					first_name: results[0]?.first_name,
					id: results[0]?.id,
					role: results[0]?.role,
					last_name: results[0]?.last_name,
					email: email,
				};
			});
		} catch (e) {
			console.error(e);
			return {
				first_name: "",
				id: "",
				role: "",
				last_name: "",
				email: "",
			};
		}
	}
}
