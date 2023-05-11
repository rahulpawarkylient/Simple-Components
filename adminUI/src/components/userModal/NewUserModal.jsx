import { Dialog } from '@mui/material';
import React from 'react';
import NewUserForm from './NewUserForm';

const NewUserModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <NewUserForm handleClose={handleClose} />
    </Dialog>
  )
}

export default NewUserModal;