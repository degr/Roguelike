import RequestService from "./RequestService";

class UserService extends RequestService {

    logout() {
        return this.sendRequest("user/logout", null);
    }
    
	isAuthorised() {
		return this.sendRequest("user/is-authorised", null);
	}

    login(email, password) {
		return this.sendRequest("user/login", {
			email: email,
			password: password
		});
	}

	register(email, password) {
		return this.sendRequest("user", {
			email: email,
			password: password
		});
	}

    isExist(email) {
        return this.sendRequest("user/get-by-email", {
            email: email
        })
    }
}

export default new UserService();
