import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import NavigationItem from './NavigationItem';
import { selectNavigation } from '../../core/flow/FlowActions';

class Navigation extends Component {
    state = {
        isOpen: false
    };

    onToggleNavigation = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const items = this.props.navigation.items.map(item => {
            return <NavigationItem item={ item } key={ item.id } onClick={ this.props.onClickItem } />;
        });

        const classes = classNames({
            'collapse': true,
            'navbar-collapse': true,
            'show': this.state.isOpen
        });

        return (
            <div className="navigation">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">{ this.props.navigation.name }</span>

                    <button className="navbar-toggler" type="button" onClick={ this.onToggleNavigation } aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className={ classes }>
                        <ul className="navbar-nav">
                            { items }
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

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
        onClickItem: (item) => {
            selectNavigation(dispatchProps.dispatch, stateProps.tenant, ownProps.navigation.id, item.id, stateProps.invoke);
        }
    }
};

export default connect(mapStateToProps, null, mergeProps)(Navigation);
