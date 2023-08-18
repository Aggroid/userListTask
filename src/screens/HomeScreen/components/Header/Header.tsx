import React, { FC } from 'react';
import { Typography, Grid, TextField, Button, Box } from '@material-ui/core';
import useStyles from './useStyles';

interface HeaderProps {
    search: string;
    setSearch: (search: string) => void;
    handleOpen: () => void;
}

const Header: FC<HeaderProps> = ({ search, setSearch, handleOpen }) => {
    const classes = useStyles();
    return (
        <Box className={classes.headerBox}>
            <Grid container justify="center">
                <Typography component="h1" variant="h3" className={classes.title}>
                    User List
                </Typography>
            </Grid>

            <Grid container spacing={3} alignItems="center">
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search by name"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.addUserButton}
                        onClick={handleOpen}>
                        Add User
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Header;
