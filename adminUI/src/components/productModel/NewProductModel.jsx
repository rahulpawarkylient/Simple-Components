import { Dialog } from '@mui/material';
import React from 'react';
import NewProductForm from './NewProductForm';

const NewProductModel = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <NewProductForm handleClose={handleClose} />
    </Dialog>
  )
}

export default NewProductModel;