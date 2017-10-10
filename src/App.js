import React, { Component } from 'react';
import Flow from "./flow/Flow";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Flow developerName="Quick App" tenant="07f799a4-af7c-449b-ba7c-f1f526f7000a" />
            </div>
        );
    }
}

export default App;
