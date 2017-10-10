import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Presentation extends Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.props.data.content }} />
        )
    }
}

Presentation.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string
    })
};

export default Presentation;