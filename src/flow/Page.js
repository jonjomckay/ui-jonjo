import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageContainer from "./PageContainer";
import Outcome from "./Outcome";

import './Page.css';

class Page extends Component {
    state = {
        containers: []
    };

    componentDidMount = () => {
        this.setState({
            containers: this.convertContainers(this.props.response, this.props.response.pageContainerResponses)
        });
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.response !== this.props.response) {
            this.setState({
                containers: this.convertContainers(nextProps.response, nextProps.response.pageContainerResponses)
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
    convertContainers = (page, containers) => {
        return (containers || [])
            .sort((a, b) => a.order - b.order)
            .map(container => {
                const components = page.pageComponentResponses.filter(component => component.pageContainerId === container.id)
                    .sort((a, b) => a.order - b.order)
                    .map(component => this.convertComponent(page, component));

                return {
                    ...container,
                    components: components,
                    containers: this.convertContainers(page, container.pageContainerResponses)
                };
            });
    };

    render() {
        const containers = this.state.containers.map(container => {
            return (
                <PageContainer container={ container } key={ container.id } />
            );
        });

        const outcomes = this.props.outcomes
            .filter(outcome => outcome.pageObjectBindingId === null)
            .map(outcome => {
                return (
                    <Outcome key={ outcome.id } onClick={ this.props.onClickOutcome } outcome={ outcome } />
                );
            });

        return (
            <div className="page">
                <div className="container">
                    { containers }
                </div>

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

const mapStateToProps = state => {
    return {
        outcomes: state.outcomes.outcomes
    };
};

export default connect(mapStateToProps)(Page);