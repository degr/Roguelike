import appDispatcher from "~/dispatcher/AppDispatcher";
import history from '~/components/history/History';
import RequestService from "~/services/RequestService";

export default {
    loadRaces(){
        RequestService.sendRequest("person/get-races").then((v) => {
            appDispatcher.dispatch({
                type: 'get-races',
                data: v
            })
        })
    }
}
