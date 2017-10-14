import React, { Component } from 'react';
import classNames from 'classnames';

export default class VerticalContainer extends Component {
    render() {
        let label;

        if (this.props.container.label) {
            label = <h3>{ this.props.container.label }</h3>
        }

        const classes = classNames({
            'd-flex flex-column flex-grow': this.props.containers.length < 2,
            'my-2': true,
            'col': this.props.containers.length > 1
        });

        return (
            <div className={ classes }>
                { label }

                { this.props.containers }
                { this.props.components }
            </div>
        )
    }
}