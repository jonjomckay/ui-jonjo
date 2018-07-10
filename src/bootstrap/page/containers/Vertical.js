import React from 'react';
import classNames from 'classnames';

export default ({ components, containers, container }) => {
    let label;

    if (container.label) {
        label = <h3>{ container.label }</h3>
    }

    const classes = classNames({
        'd-flex flex-column flex-grow': containers.length < 2,
        'my-2': true,
        'col': containers.length > 1
    });

    return (
        <div className={ classes }>
            { label }

            { containers }
            { components }
        </div>
    )
};
