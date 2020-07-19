import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import   './SignUp.scss';

function SignUp(props) {
    const [userConnection, setUserConnection] = useState(props.userConnection);
    const [submitForm , setSubmitForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        //  Merge of userConnection object with the key value from the left 
        setUserConnection(userConnection => ({ ...userConnection, [name]: value }));
        props.handleInputUserConnection(userConnection);
    }

    const handleNext = () => {
        if(!userConnection.username || !userConnection.email || !userConnection.password ){
            setSubmitForm(true);
            return;
        }
        props.handleNext();
    }


    return(
        <div className="sign-up">
        <div className="col-lg-5 center">
            <h2>Sign Up</h2>
            <form name="form"  noValidate autoComplete="off">
                <div className="line">
                    <TextField error={submitForm && !userConnection.username ? true : false} id="username" name="username" label="UserName" value={userConnection.username} variant="outlined" onChange={handleChange}/>
                </div>
                <div className="line">
                    <TextField error={submitForm && !userConnection.email ? true : false} id="email" name="email" label="email" value={userConnection.email} variant="outlined" onChange={handleChange}/>
                </div>
                <div className="line">
                <FormControl variant="outlined">
                <InputLabel htmlFor="password" error={submitForm && !userConnection.password ? true : false}>Password</InputLabel>
                <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={userConnection.password}
                onChange={handleChange}
                name="password"
                labelWidth={70}
                error={submitForm && !userConnection.password ? true : false}
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
                <Button variant="contained" color="primary" onClick={() => props.handleBack()}>Back</Button>  
                <Button variant="contained" color="primary" onClick={() => handleNext()} >Next</Button>  
            </form>
            </div>
        </div>
    );
}

export { SignUp };