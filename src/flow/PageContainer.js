import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VerticalContainer from "./containers/VerticalContainer";
import HorizontalContainer from "./containers/HorizontalContainer";
import GroupContainer from "./containers/GroupContainer";
import ComponentFactory from "./components/ComponentFactory";
import { Sorts } from "../utils/Sorts";

class PageContainer extends Component {
    render() {
        // Created instances of all the nested containers
        const containers = (this.props.container.containers || []).sort(Sorts.byOrder)
            .map(container => {
                return <PageContainer container={ container } key={ container.id } />
            });

        const components = this.props.container.components.map(ComponentFactory.createComponent);

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