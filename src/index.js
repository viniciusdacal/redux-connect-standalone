import React, { Component } from 'react';
import { object } from 'prop-types';
import { connect as Connect, Provider } from 'react-redux';

export const createConnect = store => (...configs) => (WrappedComponent) => {
  const ConnectedComponent = Connect(...configs)(WrappedComponent);
  class ConnectWrapper extends Component {
    render() {
      if (this.context.store) {
        return <ConnectedComponent {...this.props} />;
      }

      return (
        <Provider store={store}>
          <ConnectedComponent {...this.props} />
        </Provider>
      );
    }
  }
  const contextTypes = ConnectedComponent.contextTypes || {};
  ConnectWrapper.contextTypes = { ...contextTypes, store: object };
  return ConnectWrapper;
};

export default createConnect;
