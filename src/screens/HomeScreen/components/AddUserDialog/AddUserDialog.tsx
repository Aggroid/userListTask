import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';
import { User } from '../../../../api';


interface Errors {
    name?: string;
    email?: string;
    phone?: string;
}

interface AddUserDialogProps {
    open: boolean;
    handleClose: () => void;
    newUser: User;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errors: Errors;
    handleAddUser: () => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, handleClose, newUser, handleChange, errors, handleAddUser }) => {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={newUser.name}
                    onChange={handleChange}
                    helperText={errors.name}
                    error={Boolean(errors.name)}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={newUser.email}
                    onChange={handleChange}
                    helperText={errors.email}
                    error={Boolean(errors.email)}
                />
                <TextField
                    margin="dense"
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    value={newUser.phone}
                    onChange={handleChange}
                    helperText={errors.phone}
                    error={Boolean(errors.phone)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddUser} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddUserDialog;
