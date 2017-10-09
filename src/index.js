import React from 'react';
import { object } from 'prop-types';
import { connect as Connect, Provider } from 'react-redux';

export const createConnect = (store) =>  = (...configs) => (WrappedComponent) => {
  const ConnectedComponent = Connect(...configs)(WrappedComponent);
  const ConnectWrapper = (props, context) => {
    if (context.store) {
      return <ConnectedComponent {...props} />;
    }

    return (
      <Provider store={store}>
        <ConnectedComponent {...props} />
      </Provider>
    );
  };
  const contextTypes = ConnectedComponent.contextTypes || {};
  ConnectWrapper.contextTypes = { ...contextTypes, store: object };
  return ConnectWrapper;
};

export default createConnect;
