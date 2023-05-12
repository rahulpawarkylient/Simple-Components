import React from 'react'
import { Dialog } from '@mui/material';
import NewFaqForm from "./NewFaqForm"

const NewFaqModel = ({open, handleClose}) => {
  return (
    <Dialog  open={open} onClose={handleClose}>
        <NewFaqForm handleClose={handleClose} />
    </Dialog>
  )
}

export default NewFaqModel