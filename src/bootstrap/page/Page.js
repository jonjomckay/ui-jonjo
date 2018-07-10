import React from 'react';
import Outcomes from './PageOutcomes';
import PageContainers from './PageContainers';

export default () => {
    return (
        <div className="page">
            <div className="container">
                <PageContainers />
            </div>

            <div className="container outcomes">
                <Outcomes />
            </div>
        </div>
    );
};
