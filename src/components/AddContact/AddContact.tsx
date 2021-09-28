
import { Button, Container, Fade, Modal, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { makeStyles, createStyles } from '@material-ui/styles';
import { useState, FC, ReactEventHandler, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createContact } from '../../store/actions';
import { Contact } from '../../store/actionTypes/adressBook';

// import styles from './AddContact.module.scss';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'primary'
		},
		form: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			textAlign: 'center',
			padding: theme.spacing(4),
		},
		title: {
			marginBottom: theme.spacing(2)
		},
		input: {
			width: '100%',
			marginBottom: theme.spacing(2),
		},
		button: {
			width: '100%',
			height: '45px',
			marginTop: theme.spacing(2)
		},
		list: {
			paddingBottom: '80px'
		},
		contact: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
			alignItems: 'center',
			marginBottom: theme.spacing(2)
		}
	}),
);



interface AddContactProps {
	isAdding: boolean,
	onClose: any,
}


const initialState: Contact = {
	name: '',
	last_name: '',
	email: '',
	country: '',
	blocked: false
}


const { getNameList } = require('country-list');
const countries: Array<string> = Object.keys(getNameList());

const AddContact: FC<AddContactProps> = ({ isAdding, onClose }) => {

	const classes = useStyles();
	const dispatch = useDispatch();


	const [contact, setContact] = useState<Contact>(initialState);
	const [error, setError] = useState<boolean>(false);


	const createContactHandler = (e: any) => {
		e.preventDefault();
		const { name, last_name, email, country } = contact;

		if (name === '' || last_name === '' || email === '' || country === '') {
			setError(true)
			return
		}


		dispatch(createContact(contact));
		onClose();
	}




	return (
		<Modal
			className={classes.modal}
			open={isAdding}
			onClose={onClose}
			closeAfterTransition
			BackdropProps={{
				timeout: 500,
			}}>
			<Fade in={isAdding}>
				<Container fixed>
					<Paper className={classes.form}>
						<Typography className={classes.title} variant="h2">
							Add Contact
						</Typography>
						<form>
							<TextField
								required
								className={classes.input}
								value={contact.name}
								onChange={e => setContact(prev => ({
									...prev,
									name: e.target.value
								}))}
								id="outlined-basic"
								label="Name"
								variant="outlined" />
							<TextField
								required
								className={classes.input}
								value={contact.last_name}
								onChange={e => setContact(prev => ({
									...prev,
									last_name: e.target.value
								})
								)}
								id="outlined-basic"
								label="Last name"
								variant="outlined" />
							<TextField
								className={classes.input}
								type="email"
								value={contact.email}
								onChange={e => setContact(prev => ({
									...prev,
									email: e.target.value
								}))}
								id="outlined-basic"
								label="Email"
								variant="outlined" />
							<Autocomplete
								className={classes.input}
								value={contact.country}
								options={countries}
								getOptionLabel={(option: string) => option}
								style={{ width: 300 }}
								renderInput={(params: any) => (
									<TextField
										{...params}
										onChange={e => setContact(prev => ({
											...prev,
											country:
												e.target.value
										}))}
										label="Country"
										variant="outlined" />)}
							/>
							<Button
								onClick={createContactHandler}
								type="submit"
								className={classes.button}
								variant="contained"
								color="primary">
								Add Contact
							</Button>
						</form>
					</Paper>
				</Container>
			</Fade>
		</Modal>

	)
}

export default AddContact
