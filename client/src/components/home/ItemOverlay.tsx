import React, { useState } from 'react';
//Style Imports
import { useStyles } from '../../styles/StylesHome'

import {
  Button,
  Dialog,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  CssBaseline,
} from '@material-ui/core'

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
  const [mobile, setMobile] = useState(window.innerWidth <= window.innerHeight ? true : false)

  window.addEventListener("resize", () => { setMobile(window.innerWidth <= window.innerHeight ? true : false) });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    mobile ?
      <Dialog
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        PaperProps={{square: true}}
      >
        <div className={classes.dialogContentColumn}>
          <img src={item.img} className={classes.dialogImgMobile} alt="item" />
          <form className={classes.dialogFormMobile} noValidate>
            <Typography gutterBottom variant="h5" component="h2" align='center'> {item.name} </Typography>
            <ExpansionPanel className={classes.expansionPanelMobile}>
              <ExpansionPanelSummary expandIcon={<img src={ScrollUpIcon} className={classes.kunaiIconDown} alt="kunai-arrow" />} >
                <Typography>აღწერა</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography gutterBottom variant="body1" align='left'> {item.description} </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </form>
        </div>
        <Button onClick={handleClose} color="primary"> Close </Button>
      </Dialog>
      :
      <Dialog
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        PaperProps={{square: true}}
      >
        <div className={classes.dialogContentRow}>
          <CssBaseline />
          <img src={item.img} className={classes.dialogImg} alt="item" />
          <form className={classes.dialogForm} noValidate>
            <Typography variant="h5" component="h2" align='center'> {item.name} </Typography>
            <ExpansionPanel className={classes.expansionPanel} elevation={1}>
              <ExpansionPanelSummary expandIcon={<img src={ScrollUpIcon} className={classes.kunaiIconDown} alt="kunai-arrow" />} >
                <Typography>აღწერა</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography gutterBottom variant="body1" align='left'> {item.description}{item.description}{item.description}{item.description} </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Button onClick={handleClose} color="primary">Close</Button>
          </form>
        </div>
      </Dialog>
  );
}