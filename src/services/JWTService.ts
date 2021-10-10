import jwt from "jsonwebtoken";

export class JWTService {
	private static _instance: JWTService;

	static getInstance() {
		if (!this._instance) this._instance = new JWTService();
		return this._instance;
	}

	async sign(sub: object) {
		const token = jwt.sign(sub, process.env.JWT_SECRET_KEY!);
		return token;
	}

	async verify(token: string) {
		try {
			const data = <{ role: "S" | "T" }>(
				jwt.verify(token, process.env.JWT_SECRET_KEY!)
			);
			return data;
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	decode(token: string) {
		return jwt.decode(token);
	}
}
