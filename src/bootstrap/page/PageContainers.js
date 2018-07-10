import React from 'react';
import { connect } from 'react-redux';
import PageContainer from './PageContainer';

const PageContainers = ({ containers }) => {
    return containers.map(container => {
        return (
            <PageContainer container={ container } key={ container.id } />
        );
    })
};

const mapStateToProps = state => {
    return {
        containers: state.flow.page.containers
    }
};

export default connect(mapStateToProps)(PageContainers);
