import React, { Component } from 'react';
import Loading from 'react-loading-bar';
import { connect } from 'react-redux';
import axios from 'axios';
import { Sorts } from "../../utils/Sorts";

import './Table.css';

class Table extends Component {
    state = {
        isLoading: false,
        objectData: [],
        objectDataRequest: null,
        search: ''
    };

    componentDidMount = () => {
        if (this.props.component.data.objectDataRequest) {
            this.fetchData();
        } else {
            this.setState({
                objectData: this.props.component.data.objectData
            });
        }
    };

    fetchData = (objectDataRequest) => {
        const request = objectDataRequest || this.state.objectDataRequest || this.props.component.data.objectDataRequest;

        request.listFilter = {
            ...request.listFilter,
            search: this.state.search
        };

        this.setState({
            isLoading: true,
            objectData: []
        });

        axios.post('https://staging.manywho.com/api/service/1/data', request)
            .then(response => this.setState({
                isLoading: false,
                objectData: response.data.objectData,
                objectDataRequest: request
            }));
    };

    onChangeSearch = (e) => {
        this.setState({
            search: e.target.value
        });
    };

    onClickRefresh = (e) => {
        e.preventDefault();

        this.fetchData(this.state.objectDataRequest);
    };

    render() {
        let columns = this.props.component.columns.sort(Sorts.byOrder).map(column => {
            return <th key={ column.typeElementPropertyId }>{ column.label }</th>
        });

        // If we have outcomes attached to this table, then we prepend a column for them
        if (this.props.outcomes.length) {
            columns.unshift(
                <th key="actions">Actions</th>
            );
        }

        const actions = this.props.outcomes.map(outcome => {
            return <button className="btn btn-sm" key={ outcome.id }>{ outcome.label }</button>
        });

        let rows = (this.state.objectData || []).sort(Sorts.byOrder).map(row => {
            // Find only the properties that we have columns for
            const properties = row.properties.filter(property => {
                return this.props.component.columns.some(column => column.typeElementPropertyId === property.typeElementPropertyId)
            });

            const cells = properties.map(property => {
                return <td key={ property.typeElementPropertyId }>{ property.contentValue }</td>
            });

            return (
                <tr key={ row.internalId }>
                    <td key="actions">
                        { actions }
                    </td>

                    { cells }
                </tr>
            )
        });

        if (rows.length === 0 && this.state.isLoading === false) {
            rows = (
                <tr>
                    <td colSpan={ columns.length }>
                        No results
                    </td>
                </tr>
            );
        }

        let refreshButton;
        if (this.state.objectDataRequest) {
            refreshButton = (
                <div className="col-auto refresh">
                    <button className="btn btn-primary" onClick={ this.onClickRefresh }>
                        <span className="oi oi-reload" />
                    </button>
                </div>
            );
        }

        return (
            <div className="table">
                <div className="actions row">
                    <div className="col input-group search mb-2">
                        <form className="form-inline flex-grow">
                            <input type="text" className="form-control" onChange={ this.onChangeSearch }
                                   placeholder="Search..." aria-label="Search..." />

                            <span className="input-group-btn">
                                <button className="btn btn-secondary" onClick={ this.onClickRefresh } type="submit">
                                    <span className="oi oi-magnifying-glass" />
                                </button>
                            </span>
                        </form>
                    </div>

                    { refreshButton }
                </div>

                <Loading color="#2299dd" show={ this.state.isLoading } showSpinner={ false } />

                <table className="table">
                    <thead>
                    <tr>
                        { columns }
                    </tr>
                    </thead>

                    <tbody>
                    { rows }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        outcomes: state.outcomes.outcomes.filter(outcome => outcome.pageObjectBindingId === ownProps.component.id)
    };
};

export default connect(mapStateToProps)(Table);