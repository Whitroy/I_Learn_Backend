import jwt from "jsonwebtoken";

export class JWTService {
	private static _instance: JWTService;

	static getInstance() {
		if (!this._instance) this._instance = new JWTService();
		return this._instance;
	}

	async sign(sub: object) {
		const token = jwt.sign(sub, process.env.ACCESS_SECRET_KEY!);
	}
}
