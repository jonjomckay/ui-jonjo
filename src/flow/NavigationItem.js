import React, { Component } from 'react';
import classNames from 'classnames';

export default class NavigationItem extends Component {
    onClick = (e) => {
        e.preventDefault();

        this.props.onClick(this.props.item)
    };

    render() {
        const item = this.props.item;

        const classes = classNames({
            'active': item.data.isActive || item.data.isCurrent,
            'disabled': !item.data.isEnabled,
            'nav-item': true
        });

        return (
            <li className={ classes } key={ item.id }>
                <a className="nav-link" onClick={ this.onClick }>{ item.label }</a>
            </li>
        )
    }
}