import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStyles } from '../../../styles/StylesOverlayForm'
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControl,
    FormHelperText,
    MenuItem,
    Button,
    Chip,
    TextField,
    ButtonGroup
} from '@material-ui/core'

import { IItem, IStock, IOverlayFormState, IDescription } from '../../../Interfaces'
import { RootStoreContext } from '../../../stores/RootStore'

import ScrollUpIcon from '../../../assets/icons/kunai.svg'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CloseIcon from '@material-ui/icons/Close';

import { GET_ITEM } from '../../../Queries'


interface IProps {
    mobile: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    item: IItem
}

const renderList = (list: IStock[] = []) => (
    list.filter((item => item.left > 0)).map(item =>
        <MenuItem key={item.option} value={item.option}>
            {item.option}
        </MenuItem>
    )
)

const renderDescription = (list: IDescription[] = []) => (
    list.map(item =>
        <div key={item.key} style={{ display: 'flex' }}>
            <Typography variant="body1" align='left' style={{ fontWeight: "bold", marginRight: '10px' }}> {item.key}: </Typography>
            <Typography variant="body1" align='left'> {item.value} </Typography>
        </div>
    )
)

const OverlayForm: React.FC<IProps> = observer(({ item, mobile, setOpen }: IProps) => {
    const classes = useStyles({} as any);
    const store = useContext(RootStoreContext)
    const [state, setState] = useState({} as IOverlayFormState)
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
            .then(res => {
                setStockLoad(res.data.item_with_id.stock)
                if (res.data.item_with_id.stock.length === 1 && (res.data.item_with_id.stock[0].option === '')) {
                    setState((s) => {
                        return {
                            ...s,
                            option: 'სტანდარტული',
                            left: res.data.item_with_id.stock[0].left
                        }
                    })
                }
                return res
            })
    }, [item.id])

    const renderModelOption = () => (
        state.option === 'სტანდარტული' ?
            <FormControl className={classes.largeffilterRow}>
                <TextField label='მოდელი' variant="outlined" value='სტანდარტული' disabled={true}>
                    {renderList(stockLoad)}
                </TextField>
            </FormControl> :
            <FormControl className={classes.largeffilterRow}>
                <TextField
                    label='მოდელი'
                    variant="outlined"
                    required
                    select onChange={handleSelect}>
                    {renderList(stockLoad)}
                </TextField>
            </FormControl>
    )

    const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        const item = stockLoad.find((item: IStock) => item.option === event.target.value as string)
        if (item) {
            setState({ ...state, left: item.left, option: item.option })
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddToCart = () => {
        store.cartStore.cartItems.push({ item: item, option: state.option, qnty: state.qnty })
        store.cartStore.itemCount = store.cartStore.cartItems.length
    };

    return (
        <form className={mobile ? classes.dialogFormMobile : classes.dialogForm}>
            <Typography
                gutterBottom
                variant="h5"
                align='center'>
                {item.name} ({item.category})
            </Typography>

            <ExpansionPanel
                className={mobile ? classes.expansionPanelMobile : classes.expansionPanel} elevation={1}>
                <ExpansionPanelSummary
                    expandIcon={<img src={ScrollUpIcon} className={classes.kunaiIconDown} alt="kunai-arrow" />} >
                    <Typography>აღწერა</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div> {renderDescription(item.description)}</div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <div className={classes.rowWithMultipleElements}>
                {renderModelOption()}
                <FormControl className={classes.smallFilterRow}>
                    <Chip label={`დარჩენილია: ${state.left ? state.left : ''}`} variant="outlined" color='primary' />
                </FormControl>
            </div>

            <div className={mobile ? classes.collumnWithMultipleElements : classes.rowWithMultipleElements}>
                <FormControl className={classes.smallFilterRow}>
                    <TextField
                        disabled={state.option ? false : true}
                        label='რაოდენობა'
                        variant="outlined"
                        name="quantity"
                        type='number'
                        inputProps={{ min: 0, max: state.left }}
                        onChange={(e) => setState({ ...state, qnty: e.target.value })} />
                    <FormHelperText style={{ display: state.option ? 'none' : undefined }}>
                        აირჩიე მოდელი
                </FormHelperText>
                </FormControl>
                <FormControl className={classes.largeffilterRow}>
                    <ButtonGroup disabled={state.option ? false : true}>
                        <Button
                            className={classes.buttonBuy}
                            onClick={handleClose}
                            startIcon={<AccountBalanceWalletIcon />}
                            variant='outlined'>
                            ყიდვა
                         </Button>
                        <Button className={classes.buttonCart}
                            onClick={handleAddToCart}
                            startIcon={<AddShoppingCartIcon />}
                            variant='outlined'>
                            კალათში დამატება
                         </Button>
                        <Button className={classes.buttonClose}
                            onClick={handleClose}
                            startIcon={<CloseIcon />}
                            variant='outlined'>
                            დახურვა
                          </Button>
                    </ButtonGroup>
                    <FormHelperText style={{ display: state.option ? 'none' : undefined }}>
                        აირჩიე მოდელი
                </FormHelperText>
                </FormControl>
            </div>
        </form>
    );
})

export default OverlayForm