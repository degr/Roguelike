import RequestService from "~/services/RequestService";

class PersonCreationService extends RequestService {
    newPerson1(){
        console.log('PersonCreationService::newPerson1', arguments);
    }

    newPerson2(){
        console.log('PersonCreationService::newPerson2', arguments);
    }

    newPerson3(){
        console.log('PersonCreationService::newPerson3', arguments);
    }
}

export default new UserService();
