import React, { Component } from 'react';

export default class Textarea extends Component {
    render() {
        let required;
        if (this.props.component.data.isRequired) {
            required = <span className="text-danger">*</span>
        }

        return (
            <div className="form-group">
                <label>{ this.props.component.label } { required }</label>

                <textarea className="form-control" cols={ this.props.component.width } placeholder={ this.props.component.hintValue } />
            </div>
        )
    }
}