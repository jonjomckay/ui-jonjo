import React from 'react';
import { connect } from 'react-redux';
import { selectOutcome } from '../../core/flow/FlowActions';
import './PageOutcome.css';

const PageOutcome = ({ onClick, outcome }) => (
    <span className="outcome">
        <button className="btn btn-primary" onClick={ onClick } type="button">
            { outcome.label }
        </button>
    </span>
);

const mapStateToProps = state => {
    return {
        invoke: state.flow.invoke,
        tenant: state.flow.tenant
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...ownProps,
        onClick: () => {
            selectOutcome(dispatchProps.dispatch, stateProps.tenant, ownProps.outcome, stateProps.invoke);
        }
    }
};

export default connect(mapStateToProps, null, mergeProps)(PageOutcome);
