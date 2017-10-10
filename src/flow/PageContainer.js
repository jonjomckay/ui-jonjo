import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Presentation from "./components/Presentation";
import Unknown from "./components/Unknown";

// Extract
const components = {
    'presentation': Presentation,
    'unknown': Unknown
};

// Extract
const getComponent = (type) => {
    return components[type.toLowerCase()] || Unknown;
};

class PageContainer extends Component {
    // Extract?
    createComponent = (component) => {
        return React.createElement(getComponent(component.componentType), {
            data: component.data,
            key: component.id,
            type: component.componentType
        });
    };

    render() {
        const components = this.props.container.components
            .map(this.createComponent);

        return (
            <div className="container">
                { components }
            </div>
        )
    }
}

PageContainer.propTypes = {
    container: PropTypes.shape({
        components: PropTypes.array
    })
};

export default PageContainer;