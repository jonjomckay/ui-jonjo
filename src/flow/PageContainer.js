import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VerticalContainer from "./containers/VerticalContainer";
import HorizontalContainer from "./containers/HorizontalContainer";
import GroupContainer from "./containers/GroupContainer";
import ComponentFactory from "./components/ComponentFactory";

class PageContainer extends Component {
    render() {
        const containers = (this.props.container.containers || [])
            .sort((a, b) => a.order - b.order)
            .map(container => {
                return <PageContainer container={ container } key={ container.id } outcomes={ this.props.outcomes } />
            });

        const components = this.props.container.components
            .map(component => ComponentFactory.createComponent(component, this.props.outcomes));

        const props = {
            components: components,
            container: this.props.container,
            containers: containers
        };

        let container;

        switch (this.props.container.containerType) {
            case 'GROUP':
                container = <GroupContainer { ...props } />;
                break;
            case 'HORIZONTAL_FLOW':
                container = <HorizontalContainer { ...props } />;
                break;
            case 'VERTICAL_FLOW':
            default:
                container = <VerticalContainer { ...props } />;
                break;
        }

        return container;
    }
}

PageContainer.propTypes = {
    container: PropTypes.shape({
        components: PropTypes.array
    })
};

export default PageContainer;