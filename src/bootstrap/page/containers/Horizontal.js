import React from 'react';
import classNames from 'classnames';

import './Horizontal.css';

export default ({ components, container, containers}) => {
    let label;

    if (container.label) {
        label = <h3>{ container.label }</h3>
    }

    const classes = classNames({
        'd-flex flex-row': containers.length < 2,
        'mx-0': true,
        'row': containers.length > 1
    });

    return (
        <div className="container-horizontal">
            { label }

            <div className={ classes }>
                { containers }
                { components }
            </div>
        </div>
    );
};
