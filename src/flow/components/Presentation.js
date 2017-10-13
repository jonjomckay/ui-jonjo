import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Presentation extends Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.props.component.data.content }} />
        )
    }
}

Presentation.propTypes = {
    component: PropTypes.shape({
        data: PropTypes.shape({
            content: PropTypes.string
        })
    })
};

export default Presentation;