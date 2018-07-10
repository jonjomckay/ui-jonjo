import React from 'react';

import GroupContainer from './containers/Group';
import HorizontalContainer from './containers/Horizontal';
import VerticalContainer from './containers/Vertical';

// TODO: Extract this all to be renderer-agnostic
const defaultContainers = {
    'group': GroupContainer,
    'horizontal_flow': HorizontalContainer,
    'vertical_flow': VerticalContainer
};

const getContainer = (type) => {
    return defaultContainers[type.toLowerCase()] || VerticalContainer;
};

export default class ContainerFactory {
    static createContainer = (container, props) => {
        return React.createElement(getContainer(container.containerType), {
            ...props,
            container: container,
            key: container.id
        });
    };
}
