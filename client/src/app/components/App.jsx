import React from 'react';

export default class App extends React.Component {
    render() {
        return React.cloneElement(this.props.children, {});
    }
};
