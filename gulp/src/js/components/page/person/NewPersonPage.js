import React from 'react';
import {Container} from 'flux/utils';

import AbstractPage from '~/components/page/AbstractPage';

import StepGeneral from './StepGeneral.js';
import StepStatistics from './StepStatistics.js';
import StepSkills from './StepSkills.js';

import newPersonPageStore from '~/stores/person/NewPersonPageStore';
import racesStore from '~/stores/person/RacesStore';
import racesActions from '~/actions/person/racesActions';

class NewPersonPage extends AbstractPage {
    static URL = "createPerson";
    static getStores(){
        return [];
    }
    static calculateState(){
        return {
            races: racesStore.getState(),
            newPerson: newPersonPageStore.getState()
        }
    }
    
    step = 1;
    
    afterMount(){
        if(this.state.races.length == 0) {
            racesActions.loadRaces();
        }
    }
    
    
    
    render() {
        switch (this.step) {
            case 1: 
                return <StepGeneral races={this.state.races} onSubmit={this.onSubmitGeneral.bind(this)}/>;
            case 2: 
                return <StepStatistics />;
            case 3:
                return <StepSkills />;
            default:
                return <div>Something wrong, please reload page.</div>;
        }
    }

    onSubmitGeneral(){
        
    }
}

export default Container.create(NewPersonPage);