import { Request, Response } from "express";
import { DBService } from "../services/DBService";
import { JWTService } from "../services/JWTService";

export const login = async (req: Request, res: Response) => {
	const { validated } = req.params;
	const data: {
		email?: string;
		password?: string;
	} = req.body;

	if (validated === "T") {
		const result = await DBService.getInstance().getJWSLogin(
			data.email!.trim()
		);
		if (result) {
			const token = JWTService.getInstance().sign({
				first_name: result?.first_name,
				id: result?.id,
			});
			res.status(200).json({
				data: {
					accessToken: token,
					user: result,
				},
			});
		}
	} else {
		return res.status(401).json({ error: "Invalid Credentials" });
	}
};
