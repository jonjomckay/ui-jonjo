import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Navigation.css';
import NavigationItem from "./NavigationItem";

class Navigation extends Component {
    state = {
        isOpen: false,
        navigation: {
            id: '',
            name: '',
            items: []
        }
    };

    componentDidMount = () => {
        this.fetchNavigation();
    };

    // Extract
    fetchNavigation = () => {
        const body = {
            stateId: this.props.state,
            stateToken: this.props.stateToken,
            navigationElementId: this.props.reference.id
        };

        axios.post('https://staging.manywho.com/api/run/1/navigation/' + this.props.state, body)
            .then(response => this.createNavigation(response.data))
            .then(response => this.setState({
                navigation: response
            }));
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.stateToken !== this.props.stateToken) {
            this.fetchNavigation();
        }
    };

    // Extract
    createNavigation = (response) => {
        const items = response.navigationItemResponses
            .sort((a, b) => a.order - b.order)
            .map(item => {
                const data = response.navigationItemDataResponses.find(data => data.navigationItemId === item.id);

                return {
                    ...item,
                    data: data
                };
            });

        return {
            id: this.props.reference.id,
            name: response.label,
            items: items
        }
    };

    onClickItem = (item) => {
        this.props.onClickItem(this.state.navigation.id, item);
    };

    onToggleNavigation = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const items = this.state.navigation.items.map(item => {
            return <NavigationItem item={ item } key={ item.id } onClick={ this.onClickItem } />;
        });

        const classes = classNames({
            'collapse': true,
            'navbar-collapse': true,
            'show': this.state.isOpen
        });

        return (
            <div className="navigation">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">{ this.state.navigation.name }</span>

                    <button className="navbar-toggler" type="button" onClick={ this.onToggleNavigation } aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className={ classes }>
                        <ul className="navbar-nav">
                            { items }
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

Navigation.propTypes = {
    onClickItem: PropTypes.func.isRequired,
    reference: PropTypes.shape({
        developerName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    })
};

export default Navigation;