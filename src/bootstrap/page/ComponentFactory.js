import React from 'react';

import Presentation from './components/Presentation';
import Unknown from './components/Unknown';

// TODO: Extract this all to be renderer-agnostic
const components = {
    // 'input': Input,
    'presentation': Presentation,
    // 'table': Table,
    // 'textarea': Textarea,
    'unknown': Unknown
};

const getComponent = (type) => {
    return components[type.toLowerCase()] || Unknown;
};

export default class ComponentFactory {
    static createComponent = (values, component) => {
        return React.createElement(getComponent(component.componentType), {
            component: component,
            key: component.id
        });
    };
}
