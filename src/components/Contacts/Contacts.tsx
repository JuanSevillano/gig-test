
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
	Theme,
	Typography
} from '@material-ui/core';
import { EditOutlined, DeleteOutlined } from '@material-ui/icons';
import { Contact } from '../../store/actionTypes/adressBook';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';


import styles from './Contacts.module.scss'
import { makeStyles, createStyles } from '@material-ui/styles';
import { editContact, removeContact } from '../../store/actions';
import { useHistory } from 'react-router';


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


	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();

	const contacts = useSelector((state: AppState) => state.contacts.contacts);



	const onEdit = (contact: Contact) => {
		const url: string = `/detail/${contact.id}`
		history.push(url)
	}

	const onDelete = (contact: Contact) => dispatch(removeContact(contact));


	return (
		<List dense className={classes.list}>
			{contacts.map((contact: Contact) => (
				<Paper key={contact.name} onClick={() => onEdit(contact)}>
					<ListItem className={classes.contact} key={contact.name} button>
						<ListItemAvatar>
							<Avatar alt={`Contact ${contact.name}`} />
						</ListItemAvatar>
						<ListItemText primary={`${contact.name}  ${contact.last_name}`} />
						<ListItemSecondaryAction>
							<IconButton onClick={(e) => { e.stopPropagation(); onDelete(contact) }}>
								<DeleteOutlined />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</Paper>))
			}
			{
				contacts.length < 1
					? <Typography variant="h5" align="center">
						There's not contact yet.. add one :)
					</Typography>
					: null
			}
		</List>
	)
}

export default Contacts
