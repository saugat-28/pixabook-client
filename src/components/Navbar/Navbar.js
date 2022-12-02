import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import pixabookLogo from '../../images/pixabook-logo.png';
import pixabookText from '../../images/pixabook-text.png';
import useStyles from './styles';
import decode from 'jwt-decode';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const signOut = () => {
        dispatch({type:'LOGOUT'});
        setUser(null);
        navigate("/auth");
    }

    useEffect(()=>{
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()){
                signOut();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        // eslint-disable-next-line
    },[location])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to="/" className={classes.brandContainer}>
                <img src={pixabookText} alt="icon" height="45px"/>
                <img className={classes.image} src={pixabookLogo} alt="Pixabay" height="50px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={signOut}>Sign out</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar