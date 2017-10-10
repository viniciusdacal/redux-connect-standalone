import React, { Component } from 'react';
import { createStore } from 'redux';
import expect from 'expect';
import TestUtils from 'react-dom/test-utils';

import createConnect from '../src/index';

class Passthrough extends Component {
  render() {
    return <div />;
  }
}

class Container extends Component {
  render() {
    return <Passthrough {...this.props} />;
  }
}

describe('createConnect', () => {
  it('should pass state and props to the given component', () => {
    const store = createStore(() => ({
      foo: 'bar',
      baz: 42,
      hello: 'world'
    }));
    const connect = createConnect(store);

    const ConnectedContainer = connect(
      ({ foo, baz }) => ({ foo, baz }),
    )(Container);

    const container = TestUtils.renderIntoDocument(
      <ConnectedContainer pass="through" baz={50} />
    );

    const stub = TestUtils.findRenderedComponentWithType(container, Passthrough)

    expect(stub.props.pass).toEqual('through')
    expect(stub.props.foo).toEqual('bar')
    expect(stub.props.baz).toEqual(42)
    expect(stub.props.hello).toEqual(undefined)
    expect(() =>
      TestUtils.findRenderedComponentWithType(container, ConnectedContainer)
    ).not.toThrow()
  })
})
