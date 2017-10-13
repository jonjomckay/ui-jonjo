import React, { Component } from 'react';

export default class HorizontalContainer extends Component {
    render() {
        let label;

        if (this.props.container.label) {
            label = <h3>{ this.props.container.label }</h3>
        }

        return (
            <div>
                { label }

                <div className="d-flex flex-row my-2">
                    { this.props.containers }
                    { this.props.components }
                </div>
            </div>
        )
    }
}