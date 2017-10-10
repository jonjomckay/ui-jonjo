import React, { Component } from 'react';

export default class Outcome extends Component {
    onClick = (e) => {
        e.preventDefault();

        this.props.onClick(this.props.outcome.id);
    };

    render() {
        const outcome = this.props.outcome;

        return (
            <button className="btn btn-primary" onClick={ this.onClick } type="button">
                { outcome.label }
            </button>
        )
    }
}