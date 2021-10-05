
import { Box, Fab, makeStyles, createStyles, Theme, LinearProgress, Backdrop, Fade } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import AddContact from '../../components/AddContact/AddContact';
import Contacts from '../../components/Contacts/Contacts';
import { Contact } from '../../store/actionTypes/adressBook';
import { AppState } from '../../store/store';
// import classes from './ContactList.module.scss'

import Spinner from '../../components/Spinner/Spinner';

const data: Array<Contact> = new Array(10).fill({
	name: 'Juan David',
	last_name: 'Sevillano',
	email: 'sevi0_6@hotmail.com',
	country: 'Colombia',
	blocked: false
});


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			height: '100%',
			position: 'relative',
			backgroundColor: 'white'
		},
		addIcon: {
			position: 'fixed',
			bottom: '0',
			right: '0',
			margin: theme.spacing(2),
		}
	}),
);



const ContactList: FC = (props: any) => {

	const classes = useStyles();
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const loading = useSelector((state: AppState) => state.contacts.loading);


	return (
		<Fade in={true} timeout={2000}>
			<Box className={classes.root}>
				<Contacts />
				<AddContact
					isAdding={isAdding}
					onClose={() => setIsAdding(false)}
				/>
				<Spinner loading={loading} />
				<Fab
					className={classes.addIcon}
					onClick={() => setIsAdding(prev => !prev)}
					color="primary"
					aria-label="add">
					<Add />
				</Fab>
			</Box >
		</Fade>
	)
}

export default ContactList
