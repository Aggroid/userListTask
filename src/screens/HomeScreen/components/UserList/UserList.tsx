import React , { FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { User } from '../../../../api';


interface UserListProps {
    users: User[];
    deleteUser: (id: number) => void; 
}

const UserList: FC<UserListProps> = ({ users, deleteUser }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                        <IconButton onClick={() => user.id !== undefined && deleteUser(user.id)} color="secondary">
                         <DeleteIcon />
                        </IconButton>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default UserList;
