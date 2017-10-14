import React, { Component } from 'react';
import PageContainer from "../PageContainer";
import ComponentFactory from "../components/ComponentFactory";

class GroupTab extends Component {
    onClick = () => {
        this.props.onClick(this.props.container.id);
    };

    render() {
        return (
            <li className="nav-item">
                <a className="nav-link" onClick={ this.onClick }>{ this.props.container.label }</a>
            </li>
        );
    }
}

export default class GroupContainer extends Component {
    state = {
        selected: ''
    };

    onClickGroupTab = (group) => {
        this.setState({
            selected: group
        })
    };

    render() {
        const groupTabs = this.props.container.containers.map(container => {
            return <GroupTab container={ container } key={ container.id } onClick={ this.onClickGroupTab } />;
        });

        // We want to find the container that corresponds to the selected group
        let group;
        if (this.state.selected) {
            group = this.props.container.containers.find(container => container.id === this.state.selected);
        } else {
            group = this.props.container.containers[0];
        }

        const containers = group.containers.map(container => {
            return <PageContainer components={ group.components } container={ container } key={ container.id } outcomes={ this.props.outcomes } />
        });

        const components = group.components
            .map(component => ComponentFactory.createComponent(component, this.props.outcomes));

        return (
            <div className="d-flex flex-column">
                <nav className="nav nav-tabs mb-2">
                    { groupTabs }
                </nav>

                { containers }

                <div className="my-2">
                    { components }
                </div>
            </div>
        )
    }
}