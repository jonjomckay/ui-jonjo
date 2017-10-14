import React from 'react';
import { connect } from 'react-redux';
import { selectOutcome } from './FlowActions';

import './Outcome.css';

const Outcome = ({ onClick, outcome }) => (
    <span className="outcome">
        <button className="btn btn-primary" onClick={ onClick } type="button">
            { outcome.label }
        </button>
    </span>
);

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(selectOutcome(ownProps.outcome));
        }
    }
};

export default connect(null, mapDispatchToProps)(Outcome);