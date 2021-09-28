
import { FC } from 'react';
import {
	Paper,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemSecondaryAction,
	ListItemText,
	IconButton,
	Theme
} from '@material-ui/core';
import { EditOutlined, DeleteOutlined } from '@material-ui/icons';
import { Contact } from '../../store/actionTypes/adressBook';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';


import styles from './Contacts.module.scss'
import { makeStyles, createStyles } from '@material-ui/styles';
import { removeContact } from '../../store/actions';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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



const Contacts: FC = (props) => {


	const dispatch = useDispatch();
	const classes = useStyles();

	const contacts = useSelector((state: AppState) => state.contacts.contacts);



	const onEdit = (conact: Contact) => {
		// dispatch()
	}

	const onDelete = (contact: Contact) => dispatch(removeContact(contact));


	return (
		<List dense className={classes.list}>
			{contacts.map((contact: Contact) => {

				return (
					<Paper >
						<ListItem className={classes.contact} key={contact.name} button>
							<ListItemAvatar>
								<Avatar alt={`Contact ${contact.name}`} />
							</ListItemAvatar>
							<ListItemText primary={`${contact.name}  ${contact.last_name}`} />
							<ListItemSecondaryAction>
								<IconButton onClick={() => onEdit(contact)}>
									<EditOutlined />
								</IconButton>
								<IconButton onClick={() => onDelete(contact)}>
									<DeleteOutlined />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</Paper>
				);
			})}
		</List>
	)
}

export default Contacts
