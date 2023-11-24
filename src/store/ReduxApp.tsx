import {Provider} from 'react-redux';
import store from './createStore';
import App from '../App.tsx';

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default ReduxApp;