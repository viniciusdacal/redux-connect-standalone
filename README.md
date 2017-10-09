# Redux Connect Standalone
This is HOC fuction that allows you to use redux when you aren't able to have a single root Provider in your application. Eg: You are migrating a legacy application to React and has a few react components inside this application.

Before using this, you need to configure your redux store and export it, just like below.

```js
import { createStore } from 'redux';
import rootReducer 'path/to/rootReducer';

const store = createStore(rootReducer)
export default store;
```

Then, you can create a file named connect, import the store into it and generate you connect function:

```js
import createConnect from 'redux-connect-standalone';
import store from 'path/to/youStore'

export const connect = createConnect(store);
```

Now, you can use this function the same way you would use [react-redux's connect function](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options):

```jsx
import { connect } from 'path/to/yourConnect';
import TodoList from './TodoList';

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
```


### License
MIT
