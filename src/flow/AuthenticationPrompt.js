import React, { Component } from 'react';

import './AuthenticationPrompt.css';

export default class AuthenticationPrompt extends Component {
    state = {
        username: '',
        password: ''
    };

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();

        this.props.onSubmit(this.state.username, this.state.password);
    };

    render() {
        return (
            <div className="authentication-prompt">
                <h3>Login</h3>

                <p className="text-secondary">Authentication is required to access this flow</p>

                <form className="">
                    <div className="form-group">
                        <input className="form-control" onChange={ this.onChangeUsername } type="text" placeholder="Username" value={ this.state.username } />
                    </div>

                    <div className="form-group">
                        <input className="form-control" onChange={ this.onChangePassword } type="password" placeholder="Password" value={ this.state.password } />
                    </div>

                    <button onClick={ this.onSubmit } className="btn btn-lg btn-primary">Login</button>
                </form>
            </div>
        )
    }
}