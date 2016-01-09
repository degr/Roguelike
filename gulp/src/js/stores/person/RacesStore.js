import {ReduceStore} from 'flux/utils';
import appDispatcher from '~/dispatcher/AppDispatcher'

class RacesStore extends ReduceStore {

    getInitialState() {
        return []
    }

    reduce(state, action) {
        switch (action.type) {
            case 'get-races':
                this.getState().length = 0;
                action.data.forEach((v) => {this.getState().push(v)});
                break;
        }
        return this.getState();
    }

    areEqual(one, two) {
        return false;
    }

}


export default new NewPersonPageStore(appDispatcher);
