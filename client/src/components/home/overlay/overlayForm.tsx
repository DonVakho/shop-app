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
    const [state, setState] = useState({ option: '', qnty: 1, left: 1, gender: '' } as IOverlayFormState)
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
                    setState((oldState) => ({ ...oldState, option: 'სტანდარტული', left: res.data.item_with_id.stock[0].left }))
                }
                return res
            })
    }, [item.id])

    const getError = (): boolean => {
        return (state.qnty > state.left)
            || (state.qnty < 1)
            || (state.qnty != parseInt(state.qnty, 10))
    }


    const getHeleperTextInput = (): string => {
        if (state.qnty != parseInt(state.qnty, 10)) {
            return "შეიყვანეთ მთელი რიცხვი"
        }
        if (state.qnty < 1) {
            return "მინიმალური რაოდენობა არის 1"
        }
        if (state.qnty > state.left) {
            return `სამწუხაროდ დარჩენილია მხოლოდ  ${state.left}`
        }
        return state.option ? `დარჩენილია ${state.left}` : "აირჩიეთ მოდელი"
    }


    const getHeleperTextButtons = (): string => {
        if (getError()) {
            return "შეასწორეთ შეცდომები"
        } else {
            return state.option ? "" : "აირჩიეთ მოდელი"
        }
    }

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
                    value={state.option}
                    select
                    onChange={handleSelect}>
                    {renderList(stockLoad)}
                </TextField>
            </FormControl>
    )
    const rendeGender = () => (
        <FormControl className={classes.largeffilterRow}>
            <TextField
                label='სქესი'
                variant="outlined"
                required
                value={state.gender}
                select
                onChange={handleGender}>
                <MenuItem key={'ბიჭი'} value={'ბიჭი'}>
                    {'ბიჭი'}
                </MenuItem>
                <MenuItem key={'გოგო'} value={'გოგო'}>
                    {'გოგო'}
                </MenuItem>
            </TextField>
        </FormControl>
    )
    const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        const item = stockLoad.find((item: IStock) => item.option === event.target.value as string)
        if (item) {
            setState({ ...state, left: item.left, option: item.option })
        }
    };

    const handleGender = (event: React.ChangeEvent<{ value: unknown }>) => {
            setState({ ...state, gender: event.target.value as string })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBuyNow = () => {
        setOpen(false);
    };

    const handleAddToCart = () => {
        store.cartStore.cartItems.push({ item: item, option: state.option, qnty: state.qnty, gender: state.gender })
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
                {item.category === 'მაისურები' ? rendeGender():null}
                <FormControl className={classes.largeffilterRow}>
                    <TextField
                        disabled={state.option ? false : true}
                        required
                        error={getError()}
                        helperText={getHeleperTextInput()}
                        label='რაოდენობა'
                        variant="outlined"
                        name="quantity"
                        type='number'
                        value={state.qnty}
                        inputProps={{ min: 1, max: state.left }}
                        onChange={(e) => setState({ ...state, qnty: e.target.value })} />
                </FormControl>
            </div>
            <FormControl className={classes.buttonForm} >
                <ButtonGroup>
                    <Button
                        className={classes.buttonBuy}
                        disabled={!getError() && state.option ? false : true}
                        onClick={handleBuyNow}
                        startIcon={<AccountBalanceWalletIcon />}
                    >
                        ყიდვა
                         </Button>
                    <Button
                        className={classes.buttonCart}
                        disabled={!getError() && state.option ? false : true}
                        onClick={handleAddToCart}
                        startIcon={<AddShoppingCartIcon />}
                    >
                        კალათში დამატება
                         </Button>
                    <Button className={classes.buttonClose}
                        onClick={handleClose}
                        startIcon={<CloseIcon />}
                    >
                        დახურვა
                          </Button>
                </ButtonGroup>
                <FormHelperText error={getError()}>
                    {getHeleperTextButtons()}
                </FormHelperText>
            </FormControl>
        </form>
    );
})

export default OverlayForm