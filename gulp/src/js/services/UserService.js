import RequestService from "./RequestService";

class UserService extends RequestService {

    logout() {
        return this.post("user/logout", null);
    }
    
	isAuthorised() {
		return this.post("user/is-authorised", null);
	}

    login(email, password) {
		return this.post("user/login", {
			email: email,
			password: password
		});
	}

	register(email, password) {
		return this.post("user", {
			email: email,
			password: password
		});
	}

    isExist(email) {
        return this.post("user/get-by-email", {
            email: email
        })
    }
}

export default new UserService();
