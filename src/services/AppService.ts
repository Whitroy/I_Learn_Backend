import { DBService } from "./DBService";
import { JWTService } from "./JWTService";

export class AppService {
	constructor() {
		new DBService();
		new JWTService();
	}
}
