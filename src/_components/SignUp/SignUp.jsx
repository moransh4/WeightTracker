import React, { useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { registrationActions } from '../../_actions';
import   './SignUp.scss';

function SignUp() {
    const user = useSelector(state => state.registration.userConnection);
    const formInvalid = useSelector(state => state.registration.form2Invalid);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(registrationActions.handleChangeForm2(e.target));
    }


    const  handleNext = () => {
        dispatch(registrationActions.submitStep2(user));
    }

    const handleBack = () => {
        dispatch(registrationActions.changeCurrentStep(1));
    }


    return(
        <div className="sign-up">
        <div className="col-lg-5 center">
            <h2>Sign Up</h2>
            <form name="form"  noValidate autoComplete="off">
                <div className="line">
                    <TextField error={formInvalid && !user.username ? true : false} id="username" name="username" label="UserName" value={user.username} variant="outlined" onChange={handleChange}/>
                </div>
                <div className="line">
                    <TextField error={formInvalid && !user.email ? true : false} id="email" name="email" label="email" value={user.email} variant="outlined" onChange={handleChange}/>
                </div>
                <div className="line">
                <FormControl variant="outlined">
                <InputLabel htmlFor="password" error={formInvalid && !user.password ? true : false}>Password</InputLabel>
                <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={user.password}
                onChange={handleChange}
                name="password"
                labelWidth={70}
                error={formInvalid && !user.password ? true : false}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event)=> event.preventDefault()}
                    edge="end"
                    >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }/> 
                </FormControl>
                </div>
                <Button variant="contained" color="primary" onClick={() => handleBack()}>Back</Button>  
                <Button variant="contained" color="primary" onClick={() => handleNext()} >Next</Button>  
            </form>
            </div>
        </div>
    );
}

export { SignUp };