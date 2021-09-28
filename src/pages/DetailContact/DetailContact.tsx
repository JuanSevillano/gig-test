
import { FC } from 'react';
import { Avatar, Divider, Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		small: {
			width: theme.spacing(3),
			height: theme.spacing(3),
		},
		large: {
			width: theme.spacing(7),
			height: theme.spacing(7),
		},
	}),
);

const DetailContact: FC = (props: any) => {

	const classes = useStyles();

	return (
		<div>
			<Avatar alt="contact.name" className={classes.large} />
			<Divider />
			<Typography variant="h1">
			</Typography>
		</div>
	)
}

export default DetailContact
