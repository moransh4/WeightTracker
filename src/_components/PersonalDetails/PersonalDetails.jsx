import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import   './PersonalDetails.scss';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

function PersonalDetails(props) {
    const [user, setUser] = useState(props.userDetails);
    const [submitForm , setSubmitForm] = useState(false);
    const classes = useStyles();

    const  handleNext = () => {
        if(!user.firstName || !user.lastName || !user.age || !user.height || !user.weight || !user.gender){
            setSubmitForm(true);
            return;
        }
        props.handleNext();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch(name) {
            case 'firstName': 
            case 'lastName': 
            {  
                if(/^[a-z\u05D0-\u05EA']+$/i.test(value) || value == ''){
                    setUser(user => ({ ...user, [name]: value }));    
                } 
                break;
            }
            case 'age': {
                if(/^[0-9]{0,3}?$/.test(value)){
                    setUser(user => ({ ...user, [name]: value }));    
                }
                break;
            }
            case 'height':
            case 'weight':
            {
                if(/^\d{0,3}(\.\d{0,2})?$/.test(value)){
                    setUser(user => ({ ...user, [name]: value }));    
                }
                break;
            }
            case 'jobTitle':
            case 'gender':
            case 'sportLevel':
            {
                setUser(user => ({ ...user, [name]: value }));    
               break;
            }
         }
         props.handleInputPersonalDetails(user);

    }


    return (
        <div className="personal-details">
        <div className="col-lg-5">
            <h2>Personal Details</h2>
            <form name="form" className={classes.root} noValidate autoComplete="off">
                <div className="wrapper-inline-fields">
                    <div className="inline">
                    <TextField error={submitForm && !user.firstName ? true : false} id="firstName" name="firstName" label="First Name *" value={user.firstName} variant="outlined" onChange={handleChange}/>
                    </div>
                    <div className="inline">
                    <TextField error={submitForm && !user.lastName ? true : false} id="lastName" name="lastName" label="Last Name *" value={user.lastName}  variant="outlined"  onChange={handleChange}/>
                    </div>
                </div>
                <div className="wrapper-inline-fields">
                    <div className="inline">
                    <FormControl variant="outlined">
                            <InputLabel id="gender-label" className={submitForm && !user.gender ? 'errorLeble' : ''}>Gender *</InputLabel>
                            <Select
                            labelId="gender-label"
                            id="gender"
                            value={user.gender}
                            label="Gender *"
                            name="gender"
                            onChange={handleChange}
                            error={submitForm && !user.gender ? true : false}
                            
                            >
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            </Select>
                    </FormControl>
                    </div>
                    <div className="inline">
                        <TextField error={submitForm && !user.age ? true : false} id="age" name="age" value={user.age} label="Age *" variant="outlined"  onChange={handleChange}  />
                    </div>
                </div>
                <div className="wrapper-inline-fields">
                    <div className="inline">
                        <TextField error={submitForm && !user.height ? true : false} id="height" name="height" value={user.height} label="Height *" variant="outlined"  onChange={handleChange}  />
                    </div>
                    <div className="inline">
                        <TextField  error={submitForm && !user.weight ? true : false} id="weight" name="weight" value={user.weight} label="Weight *" variant="outlined"  onChange={handleChange}  />
                    </div>
                </div>
                <div className="wrapper-inline-fields">
                    <div className="inline">
                    <FormControl variant="outlined">
                            <InputLabel id="sport-level-label">Sport Level</InputLabel>
                            <Select
                            labelId="sport-level-label"
                            id="sportLevel"
                            value={user.sportLevel}
                            name="sportLevel"
                            onChange={handleChange}
                            label="SportLevel"
                            >
                            <MenuItem value="0.2">No sport/exercise</MenuItem>
                            <MenuItem value="0.375">Light activity (sport 1-3 times per week)</MenuItem>
                            <MenuItem value="0.55">Moderate activity (sport 3-5 times per week)</MenuItem>
                            <MenuItem value="0.725">High activity (everyday exercise)</MenuItem>
                            <MenuItem value="0.9">Extreme activity (professional athlete)</MenuItem>
                            </Select>         
                    </FormControl>
                    </div>
                    <div className="inline">
                        <TextField id="jobTitle" name="jobTitle" value={user.jobTitle} label="Job Title" variant="outlined"  onChange={handleChange}   />                 
                    </div>
                </div>
                <Button
                variant="contained"
                color="primary"
                onClick={() => handleNext()}
              >
                 Next
              </Button>            
              </form>
        </div>
    </div>
    );
}

export { PersonalDetails };