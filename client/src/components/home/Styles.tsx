import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {

} from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        itemsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            margin: theme.spacing(5),
            
        },
        card: {
            width: 250,
            margin: theme.spacing(2)
        }
    }),
);