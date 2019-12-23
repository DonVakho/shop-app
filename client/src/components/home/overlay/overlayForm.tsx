import React, { useContext, useState } from 'react';
import { useStyles } from '../../../styles/StylesHome'
import {
    Button,
    Dialog,
    Typography,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    CssBaseline,
} from '@material-ui/core'

import { IItem } from '../../../Interfaces'
import { RootStoreContext } from '../../../stores/RootStore'
import ScrollUpIcon from '../../../assets/icons/kunai.svg'
import { observer } from 'mobx-react';



interface IProps {
    mobile: boolean,
    item: IItem
}


const SidePane: React.FC<IProps> = observer(({ item, mobile }: IProps) => {
    const classes = useStyles({} as any);
    const store = useContext(RootStoreContext)

    const categoryCase = () => (
        <>categoryCase</>
    )

    const categorySticker = () => (
        <>categorySticker</>
    )
    const categoryPoster = () => (
        <>categoryPoster</>
    )
    const categoryAccessories = () => (
        <>categoryAccessories</>
    )
    const categoryMug = () => (
        <>categoryMug</>
    )
    const categoryShirt = () => (
        <>categoryShirt</>
    )
    const categoryGiftBox = () => (
        <>categoryGiftBox</>
    )
    return (
        <form className={mobile ? classes.dialogFormMobile : classes.dialogForm} noValidate>
            <Typography gutterBottom variant="h5" component="h2" align='center'> {item.name} {item.category} {store.filterStore.filterData.categories.toString()}</Typography>
            <ExpansionPanel className={mobile ? classes.expansionPanelMobile : classes.expansionPanel}>
                <ExpansionPanelSummary expandIcon={<img src={ScrollUpIcon} className={classes.kunaiIconDown} alt="kunai-arrow" />} >
                    <Typography>აღწერა</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography gutterBottom variant="body1" align='left'> {item.description}  </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </form>
    );
})

export default SidePane