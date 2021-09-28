import { ComponentType, lazy, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';


import Theme from './styles/theme';
import styles from './app.module.scss';
import { Container, ThemeProvider } from '@material-ui/core';
import AppLayout from './hoc/AppLayout';
import { useDispatch } from 'react-redux';
import { loadPrevContacts } from './store/actions';

export type RouteI = {
    route: string;
    label: string;
    view: ComponentType<any>
}


const ContactList = lazy(() => import("./pages/ContactList/ContactList"));
const DetailContact = lazy(() => import("./pages/DetailContact/DetailContact"));

const routes: Array<RouteI> = new Array(
    {
        route: '/',
        label: 'Contact list',
        view: ContactList
    },
    {
        route: '/detail/:id',
        label: 'Detail Contact',
        view: DetailContact
    });


const App = () => {


    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(loadPrevContacts());

    }, []);

    return (
        <ThemeProvider theme={Theme}>
            <AppLayout routes={routes}>
                <div className={styles.app}>
                    <Switch>
                        {
                            routes.map(view => <Route
                                exact
                                key={view.route}
                                path={view.route}
                                component={view.view} />)
                        }
                    </Switch>
                </div>
            </AppLayout>
        </ThemeProvider>
    )
}


export default App