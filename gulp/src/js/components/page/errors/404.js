import React from 'react';

export default class E404 extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return  <div className="error">
            <h1>Page not found</h1>
            <p>This is not the web page you are looking for.</p>
        </div>;
    }
}
