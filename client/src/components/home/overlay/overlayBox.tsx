import React, { useState } from 'react';
//Style Imports
import { useStyles } from '../../../styles/StylesOverlayBox'

import {
  Dialog,
  CssBaseline,
} from '@material-ui/core'

//Interface Imports
import { IItem } from '../../../Interfaces'

import OverlayForm from './overlayForm'

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
        PaperProps={{ square: true }}
      >
        <div className={classes.dialogContentColumn}>
          <img src={item.img} className={classes.dialogImgMobile} alt="item" />
          <OverlayForm item={item} mobile={mobile} setOpen={setOpen}/>
        </div>
      </Dialog>
      :
      <Dialog
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        PaperProps={{ square: true }}
      >
        <div className={classes.dialogContentRow}>
          <CssBaseline />
          <img src={item.img} className={classes.dialogImg} alt="item" />
          <OverlayForm item={item} mobile={mobile} setOpen={setOpen} />
        </div>
      </Dialog>
  );
}