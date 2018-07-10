import React from 'react';

export default ({ component }) => (
    <div dangerouslySetInnerHTML={{ __html: component.data.content }} />
);
