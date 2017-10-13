import React, { Component } from 'react';

export default class VerticalContainer extends Component {
    render() {
        let label;

        if (this.props.container.label) {
            label = <h3>{ this.props.container.label }</h3>
        }

        return (
            <div className="d-flex flex-column flex-grow my-2">
                { label }

                { this.props.containers }
                { this.props.components }
            </div>
        )
    }
}