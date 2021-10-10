import { NextFunction, Response } from "express";
import { JWTService } from "../services/JWTService";

const authenticate = async (
	req: Response,
	res: Response,
	next: NextFunction
) => {
	const tokenRes = req.header("authorization");
	if (!tokenRes) {
		console.error("No Token Found!");
		res.status(401).json({ error: "No Token Found" });
	}

	const token = (tokenRes as any as string).slice(7);
	try {
		const data = await JWTService.getInstance().verify(token);
		if (data?.role === "T") {
		} else {
		}
	} catch (e) {
		res.status(401).json({ error: "Invalid Token" });
		return;
	}

	await next();
};

export default authenticate;
