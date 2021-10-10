export class FireBaseService {
	private static _instance: FireBaseService;

    constructor() {
        
    }

	static getInstance() {
		if (!this._instance) this._instance = new FireBaseService();
		return this._instance;
	}

	async verifyEmail(email: string, password: string) {}

	async getJWSLogin(email: string) {}
}
