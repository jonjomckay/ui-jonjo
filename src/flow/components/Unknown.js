import React from 'react';

const Unknown = ({ type }) => {
    console.log('An unknown component type (' + type + ') was mounted');

    return (
        <div />
    )
};

export default Unknown;