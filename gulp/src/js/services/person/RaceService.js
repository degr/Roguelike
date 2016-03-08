import RequestService from "~/services/RequestService";

class RaceService extends RequestService {
    loadRaces(){
        return this.post("person/get-races", null);
    }
}

export default new RaceService();
