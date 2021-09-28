import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './styles/index.scss';



const App = lazy(() => import('./App'));


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={<p>loading....</p>}>
                    <App />
                </Suspense>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
    , document.getElementById('root'))