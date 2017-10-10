import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageContainer from "./PageContainer";
import Outcome from "./Outcome";

import './Page.css';

class Page extends Component {
    state = {
        containers: []
    };

    componentDidMount = () => {
        this.setState({
            containers: this.convertContainers(this.props.response)
        });
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.response !== this.props.response) {
            this.setState({
                containers: this.convertContainers(nextProps.response)
            });
        }
    };

    // Extract
    convertComponent = (page, component) => {
        const data = page.pageComponentDataResponses.find(response => response.pageComponentId === component.id);

        return {
            ...component,
            data: data
        };
    };

    // Extract
    convertContainers = (page) => {
        return page.pageContainerResponses.map(container => {
            const components = page.pageComponentResponses.filter(component => component.pageContainerId === container.id)
                .map(component => this.convertComponent(page, component));

            return {
                ...container,
                components: components
            };
        });
    };

    render() {
        const containers = this.state.containers.map(container => {
            return (
                <PageContainer container={ container } key={ container.id } />
            );
        });

        const outcomes = this.props.outcomes.map(outcome => {
            return (
                <Outcome key={ outcome.id } onClick={ this.props.onClickOutcome } outcome={ outcome } />
            );
        });

        return (
            <div className="page">
                { containers }

                <div className="container outcomes">
                    { outcomes }
                </div>
            </div>
        )
    }
}

Page.defaultProps = {
    outcomes: []
};

Page.propTypes = {
    outcomes: PropTypes.array.isRequired,
    response: PropTypes.object.isRequired
};

export default Page;