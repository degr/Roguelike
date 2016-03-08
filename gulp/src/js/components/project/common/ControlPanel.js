import React from 'react';
import {Link} from 'react-router';

export default class ControlPanel extends React.Component{
    render(){
        var leftMenu = this.buildMenu(this.props.leftItems, 'nav items');
        var rightMenu = this.buildMenu(this.props.rightItems, 'nav items navbar-right');
        
        return (<div className="control-panel col-md-12">
                <h1>{this.props.title}</h1>
                <div id="navbar" className="collapse">
                    {leftMenu}
                    {rightMenu}
                </div>
                <div className="clearfix"></div>
            </div>);
    }
    
    buildMenu(items, className) {
        var menuItems = this.buildMenuItems(items);
        if (!menuItems) {
            return null;
        }
        return (<ul className={className}>
            {menuItems}
        </ul>);
    }
    buildMenuItems(items){
        if(!items)return null;
        var out = [];
        for(var i = 0; i < items.length; i++) {
            out.push(<li key={i}>{items[i]}</li>);
        }
        return out;
    }


    static getButton(text, action, isLink, className, key){
        className = className ? className : 'btn btn-primary';
        var out;
        if(isLink) {
            out = <Link to={action} className={className}>{text}</Link>
        } else {
            out = <a href="#" className={className} onClick={action}>{text}</a>
        }
        return ControlPanel.wrapButton(out);
    }
    
    static wrapButton(button, key){
        return <p className="navbar-btn" key={key}>
            {button}
        </p>;
    }
}