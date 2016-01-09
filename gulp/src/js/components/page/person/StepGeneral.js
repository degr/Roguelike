import React from 'react';

import FormWrapper from '~/components/form/FormWrapper';
import Form from '~/components/form/Form';
import Text from '~/components/form/input/Text';
import Select from '~/components/form/input/Select';

import Word from '~/word/Word';

let common = Word.getDictionary('common');
let races = Word.getDictionary('races');
let personGeneral = Word.getDictionary('person_general');

export default class NewPersonPage extends FormWrapper {
    
    constructor(params){
        super(params);
        this.state = {
            form: {
                name: {},
                race: {},
                gender: {}
            }
        }
    }
    
    render() {
        return <Form id="new_person_1" submit={this.submit.bind(this)} model={this.state.form}
                     onCollectValues={this.onCollectValues.bind(this)}>
            <Text name="name" label={personGeneral.person_name} rules="required length:3:20"/>
            <Select name="race" label={personGeneral.person_race} rules="reqired" options={this.getRaces()}/>
            <Radio name="gender" label={personGeneral.person_gender} options={this.getGenders()} rules="required"/>
        </Form>
    }
    
    getRaces(){
        if(!this.props.races)return [];
        return this.props.races.map((v) => {
            return {value: v, label: races[v]}
        });
    }

    getGenders(){
        return [
            {value: 'MALE', label: common.male},
            {value: 'FEMALE', label: common.female},
            {value: 'UNDIFFERENTIATED', label: common.undifferentiated}
        ]
    }
    
    onSubmit(model){
        
    }
}