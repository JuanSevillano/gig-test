import { createTheme, responsiveFontSizes, ThemeOptions, Theme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';



const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
        divider: 'rgba(255,255,255,0.2)',
    },
};

let theme: Theme = createTheme(themeOptions);
theme = responsiveFontSizes(theme);

export default theme;



