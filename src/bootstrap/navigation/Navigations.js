import React from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';

const Navigations = ({ navigations }) => {
    return Object.values(navigations).map(navigation => (
        <Navigation key={ navigation.id } navigation={ navigation } />
    ));
};

const mapStateToProps = state => {
    return {
        navigations: state.flow.navigations
    };
};

export default connect(mapStateToProps)(Navigations);
