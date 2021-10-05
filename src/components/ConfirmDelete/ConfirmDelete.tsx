import { Button, ButtonGroup, Container, Fade, Modal, Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import classes from './ConfirmDelete.module.scss';

interface ConfirmProps {
	isDeleting: boolean;
	onConfirmed: any;
	onCancel: any;
}


const ConfirmDelete: FC<ConfirmProps> = ({ isDeleting, onConfirmed, onCancel }) =>
	<Modal
		open={isDeleting}
		onClose={onCancel}>
		<Fade in={isDeleting} timeout={400}>
			<Container className={classes.ConfirmDelete}>
				<Paper className={classes.ContentContainer}>
					<Typography variant="h2" align="center">
						Are you sure ?
					</Typography>
					<ButtonGroup>
						<Button onClick={onCancel}>
							Cancel
						</Button>
						<Button color="primary" onClick={onConfirmed}>
							Aceptar
						</Button>
					</ButtonGroup>
				</Paper>
			</Container>
		</Fade>
	</Modal>

export default ConfirmDelete
