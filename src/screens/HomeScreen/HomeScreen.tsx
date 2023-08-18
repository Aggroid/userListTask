import React , { useState, useEffect, ChangeEvent } from 'react';
import UserList from './components/UserList/UserList';
import Pagination from './components/Pagination/Pagination';
import Header from './components/Header/Header';
import AddUserDialog from './components/AddUserDialog/AddUserDialog';
import { Container, CssBaseline, Paper, Box , Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@material-ui/core';
import { getUsers, addUser, deleteUserById, User } from '../../api';

import useStyles from "./useStyles";

type Errors = {
    name?: string;
    email?: string;
    phone?: string;
  };
  

const HomeScreen = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<User>({ name: "" , email: "", phone: "" });
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    
    const [errors, setErrors] = useState<Errors>({});


    const [search, setSearch] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const classes = useStyles();

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const usersList = await getUsers();
            setUsers(usersList);
          } catch (error) {
            setErrorMessage("Failed to load users. Please try again later.");
            setErrorModalOpen(true);
          }
        };
      
        fetchUsers();
      }, []);
      

  useEffect(() => {
    if (search !== "") {
        const filtered = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
        setFilteredUsers(filtered);
    } else {
        setFilteredUsers(users);
    }
}, [search, users]);

  const handleOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
    setErrors({});
    setNewUser({ name: "", email: "", phone: "" });
};

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
};

 

    const handleAddUser = async () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phonePattern = /^\d{10}$/;
    
        let errors: Errors = {};

        if (!newUser.name) errors.name = "Name is required.";
        if (!newUser.email || !emailPattern.test(newUser.email)) errors.email = "Email is invalid or required.";
        if (!newUser.phone || !phonePattern.test(newUser.phone)) errors.phone = "Phone Number is invalid or required.";
        
        setErrors(errors);
        
        

        if(Object.keys(errors).length >= 1) return;
    
        const user = {
            id: Math.random(),
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
        };
    
        try {
            const addedUser = await addUser(user);
            setUsers(prevUsers => [addedUser, ...prevUsers ]);
            handleClose();
        } catch (error) {
            setErrorMessage("Failed to add user. Please try again later.");
            setErrorModalOpen(true);
        }
    }


    const deleteUser = async (userId: number) => {
        try {
            await deleteUserById(userId);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            setErrorMessage("Failed to delete user. Please try again later.");
            setErrorModalOpen(true);
        }
    };
    
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const ErrorModal = ({ open, handleClose, message }: { open: boolean, handleClose: () => void, message: string }) => {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }


    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <CssBaseline />
            <Header search={search} setSearch={setSearch} handleOpen={handleOpen} />
    
            <Paper className={classes.paper}>
                <UserList users={currentUsers} deleteUser={deleteUser} />
            </Paper>
    
            <Box className={classes.paginationBox}>
                <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} currentPage={currentPage} />
            </Box>
    
            <AddUserDialog 
    open={open} 
    handleClose={handleClose} 
    newUser={newUser} 
    handleChange={handleChange} 
    errors={errors} 
    handleAddUser={handleAddUser} 
/>
<ErrorModal open={errorModalOpen} handleClose={() => setErrorModalOpen(false)} message={errorMessage} />
        </Container>
    );
}

export default HomeScreen;
