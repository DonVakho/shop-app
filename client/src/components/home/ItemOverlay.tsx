import React, { useState } from 'react';
//Style Imports
import { useStyles } from '../../styles/StylesHome'

import {
  Button,
  Dialog,
  DialogProps,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ScrollUpIcon from '../../assets/icons/kunai.svg'

//Interface Imports
import { IItem } from '../../Interfaces'

interface IProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  item: IItem
}

export default function ItemOverlay({ open, setOpen, item }: IProps) {
  const classes = useStyles();
  const [mobile, setMobile] = useState(window.innerWidth <= 991 ? true : false)

  window.addEventListener("resize", () => { setMobile(window.innerWidth <= 991 ? true : false) });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    mobile ?
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
      >
        <DialogContent className={classes.dialogContentColumn}>
          <img src={item.img} className={classes.dialogImgMobile} />
          <form className={classes.dialogFormMobile} noValidate>
            <Typography gutterBottom variant="h5" component="h2" align='center'> {item.name} </Typography>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<img src={ScrollUpIcon} className={classes.kunaiIconDown}/>} >
                <Typography>აღწერა</Typography>  
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography gutterBottom variant="body1" align='left'> {item.description} </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      :
      <Dialog
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
      >
        <DialogContent className={classes.dialogContentRow}>
          <img src={item.img} className={classes.dialogImg} />
          <form className={classes.dialogForm} noValidate>
            <Typography variant="h5" component="h2" align='center'> {item.name} </Typography>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<img src={ScrollUpIcon} className={classes.kunaiIconDown}/>} >
                <Typography>აღწერა</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography gutterBottom variant="body1" align='left'> {item.description} </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}