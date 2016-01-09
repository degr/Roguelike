import appDispatcher from "~/dispatcher/AppDispatcher";
import NewPersonService from '~/services/person/NewPersonService';
import history from '~/components/history/History';

export default {
    newPerson1(){
        NewPersonService.newPerson1().then((response) => {
            appDispatcher.dispatch({
                type: 'new-person-1',
                data: response
            })
        });
    },
    
    newPerson2(){
        NewPersonService.newPerson2().then((response) => {
            appDispatcher.dispatch({
                type: 'new-person-2',
                data: response
            })
        });
    },
    
    newPerson3(){
        NewPersonService.newPerson3().then((response) => {
            appDispatcher.dispatch({
                type: 'new-person-3',
                data: response
            })
        });
    }
}
