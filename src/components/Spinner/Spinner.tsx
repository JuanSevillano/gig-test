import { Backdrop, Fade } from '@material-ui/core';
import { FC } from 'react';
import logo from '../../assets/logo.svg';

import classes from './Spinner.module.scss';

interface SpinnerProps {
    loading: boolean;
}

const Spinner: FC<SpinnerProps> = ({ loading }) => {
    return (
        <Backdrop className={classes.spinner} open={loading}>
            <Fade in={loading}>

                <img src={logo} alt="Gig" />
            </Fade>
        </Backdrop>
    )

}

export default Spinner