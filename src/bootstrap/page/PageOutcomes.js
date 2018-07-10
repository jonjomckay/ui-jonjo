import React from 'react';
import { connect } from 'react-redux';
import Outcome from "./PageOutcome";

const PageOutcomes = ({ outcomes }) => {
    return outcomes.map(outcome => {
        return (
            <Outcome key={ outcome.id } outcome={ outcome } />
        );
    });
};

const mapStateToProps = state => {
    return {
        outcomes: state.flow.outcomes
    }
};

export default connect(mapStateToProps)(PageOutcomes);
