import React from 'react';
import classNames from 'classnames';

const NavigationItem = ({ item, onClick }) => {
    const classes = classNames({
        'active': item.data.isActive || item.data.isCurrent,
        'disabled': item.data.isEnabled === false,
        'nav-item': true
    });

    return (
        <li className={ classes } key={ item.id }>
            <a className="nav-link" onClick={ () => onClick(item) }>{ item.label }</a>
        </li>
    )
};

export default NavigationItem;
