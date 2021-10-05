import { AppBar, Container, Drawer, IconButton, List, ListItem, ListItemText, Theme, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/styles';
import { FC, ReactElement, useState } from 'react'
import { useHistory } from 'react-router';
import { RouteI } from '../App';


import styles from './AppLayout.module.scss'

interface LayoutProps {
    children: ReactElement,
    routes: Array<RouteI>
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100vw',
        paddingTop: '80px',
    },
    drawer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    burger: {
        color: 'white'
    }
}))

const AppLayout: FC<LayoutProps> = ({ children, routes }) => {

    const history = useHistory();
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const menuHandler = (url: string): void => history.push(url);


    return (
        <div className={classes.root}>
            <Drawer
                className={styles.Drawer}
                open={isOpen}
                anchor="left"
                onClick={() => setIsOpen(false)}
                onClose={() => setIsOpen(prev => !prev)}
                PaperProps={{
                    className: classes.drawer
                }}>
                <List>
                    {routes.filter(route => route.route !== '/detail/:id').map((route: RouteI) => (
                        <ListItem
                            key={route.route}
                            button
                            onClick={() => menuHandler(route.route)}>
                            <ListItemText primary={route.label} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton className={classes.burger} onClick={() => setIsOpen(prev => !prev)} edge="start">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        Address Book
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                {children}
            </Container>
        </div>
    )
}


export default AppLayout;