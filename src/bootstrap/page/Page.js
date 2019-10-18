import React from 'react';
import Outcomes from './PageOutcomes';
import PageContainers from './PageContainers';

export default () => {
    return (
        <div className="page">
            <PageContainers />

            <div className="outcomes">
                <Outcomes />
            </div>
        </div>
    );
};
