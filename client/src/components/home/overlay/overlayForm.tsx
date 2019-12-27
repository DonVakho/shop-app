import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStyles, BootstrapInput } from '../../../styles/StylesOverlayForm'
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControl,
    InputLabel,
    NativeSelect,
    Button,
} from '@material-ui/core'

import { IItem, IStock } from '../../../Interfaces'
import { RootStoreContext } from '../../../stores/RootStore'

import ScrollUpIcon from '../../../assets/icons/kunai.svg'

import { GET_ITEM } from '../../../Queries'


interface IProps {
    mobile: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    item: IItem
}

const renderList = (list: IStock[] = []) => (
    list.map(item =>
        <option key={item.option} value={item.option}>
            {item.option}
        </option>
    )
)

const OverlayForm: React.FC<IProps> = observer(({ item, mobile, setOpen }: IProps) => {
    const classes = useStyles({} as any);
    const store = useContext(RootStoreContext)
    const [qnty, setQnty] = useState(0 as any);
    const [stockLoad, setStockLoad] = useState([] as IStock[])
    useEffect(() => {
        fetch(`http://localhost:5000/entrance?${GET_ITEM(item.id)}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                } else {
                    return res.json()
                }
            })
            .then(res => setStockLoad(res.data.item_with_id.stock))

    }, [item.id])

    const categoryCase = () => (
        <FormControl className={classes.HalffilterRow}>
            <InputLabel>მოდელი</InputLabel>
            <NativeSelect
                input={<BootstrapInput name="phone-model" />}
            >
                {renderList(stockLoad)}
            </NativeSelect>
        </FormControl>
    )

    const handleClose = () => {
        setOpen(false);
    };

    // const categorySticker = () => (
    //     <>categorySticker</>
    // )
    // const categoryPoster = () => (
    //     <>categoryPoster</>
    // )
    // const categoryAccessories = () => (
    //     <>categoryAccessories</>
    // )
    // const categoryMug = () => (
    //     <>categoryMug</>
    // )
    // const categoryShirt = () => (
    //     <>categoryShirt</>
    // )
    // const categoryGiftBox = () => (
    //     <>categoryGiftBox</>
    // )
    return (
        <form className={mobile ? classes.dialogFormMobile : classes.dialogForm}>
            {console.log(stockLoad)}
            <Typography gutterBottom variant="h5" component="h2" align='center'> {item.name} {item.category}</Typography>
            <ExpansionPanel className={mobile ? classes.expansionPanelMobile : classes.expansionPanel}>
                <ExpansionPanelSummary expandIcon={<img src={ScrollUpIcon} className={classes.kunaiIconDown} alt="kunai-arrow" />} >
                    <Typography>აღწერა</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography gutterBottom variant="body1" align='left'> {item.description}  </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <div className={classes.divWithTwoSelects}>
                {categoryCase()}
                <FormControl className={classes.HalffilterRow}>
                    <InputLabel>რაოდენობა</InputLabel>
                    <BootstrapInput name="quantity" inputProps={{ type: 'number', min: 0, value: qnty }} onChange={(e) => setQnty(e.target.value)} />
                </FormControl>
            </div>
            <Button onClick={handleClose} color="primary"> Close </Button>
        </form>
    );
})

export default OverlayForm