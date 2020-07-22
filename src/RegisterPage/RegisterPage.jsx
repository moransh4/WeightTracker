import React, { useState, useEffect } from 'react';
import { userActions, registrationActions } from '../_actions';
import {  useDispatch , useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoneIcon from '@material-ui/icons/Done';
import StepConnector from '@material-ui/core/StepConnector';
import {PersonalDetails} from '../_components/PersonalDetails/PersonalDetails';
import {SignUp} from '../_components/SignUp/SignUp';
import {FinishRegistering} from '../_components/FinishRegistering/FinishRegistering';



const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;


  const icons = {
    1: <SettingsIcon />,
    2: <PersonAddIcon />,
    3: <DoneIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title:{
    textAlign: 'center',
    marginTop: '20px'
  },
  stepperWrapper:{
    padding:'15px'
  }
}));



 function RegisterPage() {
  const classes = useStyles();
  const steps = ['Settings', 'Sign Up', 'Done'];
  const dispatch = useDispatch();
  const activeStep = useSelector(state => state.registration.currentStep);

   //Call first time component  -  reset login status - set to logout 
    useEffect(() => {
        dispatch(registrationActions.resetRegistration());
        dispatch(userActions.logout());
    }, []);

const  getStepContent = () => {
  switch (activeStep) {
    case 1:
      return <PersonalDetails />;
    case 2:
      return <SignUp />;
    case 3:
      return <FinishRegistering />;
    default:
      return 'Unknown step';
  }
}

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Welcom To Weights Tracker App</h1>
      <Stepper className={classes.stepperWrapper} alternativeLabel activeStep={activeStep - 1} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="container">
          <div>
            <div className={classes.instructions}>{getStepContent()}</div>
          </div>
      </div>
    </div>
  );
}

export { RegisterPage };