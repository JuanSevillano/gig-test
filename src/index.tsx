import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './styles/index.scss';
import Spinner from './components/Spinner/Spinner';




const App = lazy(() => {
    return Promise.all([
        import("./App"),
        new Promise(resolve => setTimeout(resolve, 1200))
    ])
        .then(([moduleExports]) => moduleExports);
});


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={<Spinner loading />}>
                    <App />
                </Suspense>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
    , document.getElementById('root'))