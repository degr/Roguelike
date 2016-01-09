import RequestService from "~/services/RequestService";

class PersonCreationService extends RequestService {
    loadRaces(){
        return this.sendRequest("person/get-races", null);
    }
}

export default new UserService();
