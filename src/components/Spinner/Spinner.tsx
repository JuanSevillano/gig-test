import { Backdrop, Box, Fade } from '@material-ui/core';
import { FC } from 'react';
import logo from '../../assets/logo.svg';

import classes from './Spinner.module.scss';

interface SpinnerProps {
    loading: boolean;
}

const Spinner: FC<SpinnerProps> = ({ loading }) => {
    return (
        <Fade in={loading}>
            <Box className={classes.Spinner}>
                <img className={classes.Image} src={logo} alt="Gig" />
            </Box>
        </Fade >
    )

}

export default Spinner