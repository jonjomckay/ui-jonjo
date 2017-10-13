import React, { Component } from 'react';

import './Input.css';

export default class Input extends Component {
    render() {
        let input;

        switch (this.props.component.contentType) {
            case 'ContentPassword':
                input = <input type="password" className="form-control" placeholder={ this.props.component.hintValue } size={ this.props.component.size } />;
                break;
            case 'ContentString':
            default:
                input = <input type="text" className="form-control" placeholder={ this.props.component.hintValue } size={ this.props.component.size } />;
                break;
        }

        let required;
        if (this.props.component.data.isRequired) {
            required = <span className="text-danger">*</span>
        }

        return (
            <div className="form-group">
                <label>{ this.props.component.label } { required }</label>

                { input }
            </div>
        )
    }
}