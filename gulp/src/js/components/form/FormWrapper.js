import React from 'react';

/**
 * this class must be parent of your form component.
 * On form initializing, you need to pass
 * 
 * <Form submit={this.submit.bind(this)} onCollectValues={this.onCollectValues.bind(this)}></Form>
 * 
 * and and override method onSubmit(model, hasErrors, errors).
 * Each your input must have this structure
 * 
 * <Text name="mytext" value={this.state.form.mytext.value} errors={this.state.form.mytext.errors} />
 */
export default class FormWrapper extends React.Component {
    
    onCollectValues(name, value, errors){
        let form = {};
        for(let key in this.state.form) {
            if(key === name) {
                form[key] = {
                    value: value,
                    errors: errors
                }
            } else {
                form[key] = this.state.form[key]
            }
        }
        this.setState({form: form});
    }

    submit(model, hasErrors, errors) {
        if (hasErrors) {
            let state = {};
            for (let key in model) {
                state[key] = {
                    value: model[key],
                    errors: errors[key]
                }
            }
            this.setState(state);
        } else {
            this.onSubmit(model, hasErrors, errors);
        }
    }

    onSubmit(){
        alert('override me');
    }
}