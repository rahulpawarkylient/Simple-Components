import { Dialog } from '@mui/material';
import React from 'react';
import NewNotifyForm from './NewNotifyForm';

const NewProductModel = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <NewNotifyForm handleClose={handleClose} />
    </Dialog>
  )
}

export default NewProductModel;