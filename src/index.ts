import express, { Application } from "express";
import { AppService } from "./services/AppService";
import auth from "./routes/auth";

const app: Application = express();
const port = 3002;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth);

app.get("*", (req, res) => {
	res.status(404).json({
		data: { message: "Endpoint doesn't exist" },
	});
});

try {
	app.listen(process.env.PORT || port, (): void => {
		console.log(
			`Connected successfully on port ${port}, click http://localhost:${port}`
		);
	});
} catch (error: any) {
	console.error(`Error occured: ${error.message}`);
}

new AppService();
