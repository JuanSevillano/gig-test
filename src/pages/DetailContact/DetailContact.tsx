
import { FC, useEffect, useState } from 'react';
import { Avatar, Divider, Box, Typography, Grid, Paper, Container, Fade, List, ListItem, Fab, Tooltip, IconButton, TextField, Button, Modal, ButtonGroup } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ArrowBack, BlockOutlined, DeleteOutlined, EditOutlined, EmailOutlined, FlagOutlined, PersonOutlined } from '@material-ui/icons';
import { Contact } from '../../store/actionTypes/adressBook';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { useParams } from 'react-router';
import AddContact from '../../components/AddContact/AddContact';
import { removeContact } from '../../store/actions';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'relative',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		actions: {
			position: 'absolute',
			display: 'flex',
			flexDirection: 'column',
			top: 0,
			right: 0,
			'& > div ': {
				margin: theme.spacing(1)
			}
		},
		back: {
			position: 'absolute',
			left: 0,
			top: 0
		},
		large: {
			width: theme.spacing(10),
			height: theme.spacing(10),
		},
		item: {
			display: 'flex',
			width: '100%',
			margin: '0px',
			padding: '10px',
			justifyContent: 'space-around',
			marginBottom: theme.spacing(3),
			'& > *': {
				margin: theme.spacing(1)
			}
		}
	}),
);




const DetailContact: FC = (props: any) => {

	const classes = useStyles();
	const params: any = useParams();
	const dispatch = useDispatch();

	const friend: any = useSelector((state: AppState) =>
		state.contacts.contacts.filter((contact: Contact) => contact.id === params.id))[0];

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);


	const items = Object.keys(friend).map((key, index, array) => {
		let icon;
		switch (true) {
			case index <= 1:
				icon = <PersonOutlined />
				break;
			case index === 2:
				icon = <EmailOutlined />
				break;
			case index === 3:
				icon = <FlagOutlined />
				break;
			case index === 4:
				icon = <BlockOutlined />
				break;
		}

		const blockedButtonStyle = index === array.length - 1
			? { background: red[600] }
			: {}

		return (
			<Paper key={key} className={classes.item} style={blockedButtonStyle}>
				<Grid container >
					<Grid item>{icon}</Grid>
					<Grid item xs zeroMinWidth>
						<Typography noWrap align="center">
							{
								index === array.length - 1
									? "Block User"
									: friend[key]
							}
						</Typography>
					</Grid>

				</Grid>
			</Paper >
		)
	}).filter((el, index) => index >= 1);



	const editHandler = () => setIsEditing(true);
	const deleteHandler = () => {
		dispatch(removeContact(friend));
		props.history.push('/');
		setIsDeleting(false);
	}

	return (
		<Fade in={true} timeout={2000}>
			<Container fixed className={classes.root}>
				<Avatar alt="contact.name" className={classes.large} />
				<Divider />
				{items}
				<AddContact
					isAdding={isEditing}
					isEditing
					editContact={friend}
					onClose={() => setIsEditing(false)} />
				<ConfirmDelete
					isDeleting={isDeleting}
					onConfirmed={deleteHandler}
					onCancel={() => setIsDeleting(false)} />
				<Box className={classes.back}>
					<Tooltip title="backwards">
						<IconButton onClick={() => props.history.goBack()}>
							<ArrowBack />
						</IconButton>
					</Tooltip>
				</Box>
				<Box className={classes.actions}>
					<Tooltip title="Edit Contact">
						<IconButton onClick={editHandler}>
							<EditOutlined />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete Contact" >
						<IconButton onClick={() => setIsDeleting(true)}>
							<DeleteOutlined />
						</IconButton>
					</Tooltip>
				</Box>
			</Container >
		</Fade >
	)
}

export default DetailContact
