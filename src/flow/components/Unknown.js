import React from 'react';

const Unknown = ({ component }) => {
    console.log('An unknown component type (' + component.componentType + ') was mounted');

    return (
        <div />
    )
};

export default Unknown;