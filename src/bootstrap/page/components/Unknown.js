import React from 'react';

export default ({ component }) => {
    console.log('An unknown component type (' + component.componentType + ') was mounted');

    return (
        <div />
    )
};
