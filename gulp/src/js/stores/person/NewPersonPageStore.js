import {ReduceStore} from 'flux/utils';
import appDispatcher from '~/dispatcher/AppDispatcher'


class NewPersonPageStore extends ReduceStore {

	getInitialState() {
		return {
            newPerson: {},
            personExperience: 5000
		}
	}

	reduce(state, action) {
		switch (action.type) {
		}
        return this.getState();
	}

	areEqual(one, two) {
		return false;
	}
	
}


export default new NewPersonPageStore(appDispatcher);
