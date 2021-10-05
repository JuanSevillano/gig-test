import { ComponentType, lazy, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { Route, Router, useHistory } from 'react-router';


import Theme from './styles/theme';
import styles from './app.module.scss';
import { Container, Fade, ThemeProvider } from '@material-ui/core';
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
        label: 'Edit Contact',
        view: DetailContact
    });


const App = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(loadPrevContacts());

    }, []);



    return (
        <ThemeProvider theme={Theme}>
            <AppLayout routes={routes}>
                <div className={styles.app}>
                    <Fade>
                        <Switch>
                            {
                                routes.map(view => <Route
                                    exact={true}
                                    key={view.route}
                                    path={view.route}
                                    component={view.view} />)
                            }
                        </Switch>
                    </Fade>

                </div>
            </AppLayout>
        </ThemeProvider>
    )
}


export default App