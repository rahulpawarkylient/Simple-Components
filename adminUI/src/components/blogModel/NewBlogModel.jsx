import { Dialog } from '@mui/material';
import React from 'react';
import NewBlogForm from './NewBlogForm';

const NewBlogModel = ({ open, handleClose }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <NewBlogForm handleClose={handleClose} />
        </Dialog>
    )
}

export default NewBlogModel;