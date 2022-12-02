import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Avatar, Paper, Grid, Typography, Container, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signIn, signUp } from '../../state/actions/auth';

import useStyles from './styles';
import Input from './Input';
import { useNavigate } from 'react-router-dom';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    function handleGoogleCallback(res) {
        const primaryPayload = jwtDecode(res?.credential);
        const payload = {result: primaryPayload, token: res?.credential};
        console.log(payload);
        try {
            dispatch({ type: 'AUTH', data: payload })
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(signUp(formData, navigate));
        } else {
            dispatch(signIn(formData, navigate));
        }
        console.log(formData);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const switchMode = () => {
        setIsSignUp(!isSignUp)
        setShowPassword(false)
    };

    const handleShowPassword = () => setShowPassword(!showPassword);
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "411168407191-001epnfmn3udmpel9s1ecrqh2a8j5l63.apps.googleusercontent.com",
            callback: handleGoogleCallback,
        });

        google.accounts.id.renderButton(
            document.getElementById("googleSignIn"),
            { type: "icon", theme: "outline", size: "large" }
        );
    })

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
                    <Grid container justifyContent='center' id="googleSignIn" />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth



// OLD Button
// <Grid container justifyContent='center'>
//       <Button fullWidth variant="contained" color="primary" onClick={() => googleSignIn()}>
//          <Icon /> Sign In With Google
//       </Button>
// </Grid>

// Loggin The Credential Object in Google Success Callback
// console.log(res)
// console.log("ENCODED JWT TOKEN: ", res.credential);