import React from 'react';

import Presentation from "./Presentation";
import Unknown from "./Unknown";
import Input from "./Input";
import Textarea from "./Textarea";
import Table from "./Table";

// Extract
const components = {
    'input': Input,
    'presentation': Presentation,
    'table': Table,
    'textarea': Textarea,
    'unknown': Unknown
};

// Extract
const getComponent = (type) => {
    return components[type.toLowerCase()] || Unknown;
};

export default class ComponentFactory {
    // Extract?
    static createComponent = (component) => {
        return React.createElement(getComponent(component.componentType), {
            component: component,
            key: component.id
        });
    };
}