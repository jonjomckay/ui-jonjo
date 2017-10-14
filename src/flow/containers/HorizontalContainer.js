import React, { Component } from 'react';
import classNames from 'classnames';

import './HorizontalContainer.css';

export default class HorizontalContainer extends Component {
    render() {
        let label;

        if (this.props.container.label) {
            label = <h3>{ this.props.container.label }</h3>
        }

        const classes = classNames({
            'd-flex flex-row': this.props.containers.length < 2,
            'mx-0': true,
            'row': this.props.containers.length > 1
        });

        return (
            <div className="container-horizontal">
                { label }

                <div className={ classes }>
                    { this.props.containers }
                    { this.props.components }
                </div>
            </div>
        )
    }
}