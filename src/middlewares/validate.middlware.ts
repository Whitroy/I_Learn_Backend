import { NextFunction, Request, Response } from "express";
import { DBService } from "../services/DBService";

const validate = async (req: Request, res: Response, next: NextFunction) => {
	const data: {
		email?: string;
		password?: string;
	} = req.body;

	if (!data) {
		return res.status(400).json({ error: "Email and password are missing" });
	}

	if (!data.email?.trim()) {
		return res.status(400).json({ error: "Email is missing" });
	}

	if (!data.password?.trim()) {
		return res.status(400).json({ error: "Password is missing" });
	}

	try {
		const result = await DBService.getInstance().verifyEmail(
			data.email,
			data.password
		);
		req.params.validated = result ? "T" : "F";
		next();
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export default validate;
