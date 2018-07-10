import React, { Component } from 'react';
import ComponentFactory from './ComponentFactory';
import ContainerFactory from './ContainerFactory';

export default class PageContainer extends Component {
    render() {
        // Created instances of all the nested containers
        const containers = this.props.container.containers.map(container => {
            return <PageContainer container={ container } key={ container.id } />
        });

        const components = this.props.container.components.map(component => {
            return ComponentFactory.createComponent(this.props.values, component);
        });

        const props = {
            components: components,
            container: this.props.container,
            containers: containers
        };

        return ContainerFactory.createContainer(this.props.container, props);
    }
}
