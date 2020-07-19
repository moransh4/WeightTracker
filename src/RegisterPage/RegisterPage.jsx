import React, { useState, useEffect } from 'react';
import { userActions } from '../_actions';
import { useDispatch } from 'react-redux';
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

const DEFAULT_STATE_USER_DETAILS = {
  firstName: '',
  lastName: '',
  gender: '',
  age: '',
  height: '',
  weight: '',
  sportLevel: '',
  jobTitle: '',
}

const DEFAULT_STATE_USER_CONNECTION = {
  username: '',
  email: '',
  password: ''
}


 function RegisterPage() {
  const classes = useStyles();
  const steps = ['Settings', 'Sign Up', 'Done'];
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [userDetails, setUserDetails] = useState(DEFAULT_STATE_USER_DETAILS);
  const [userConnection, setUserConnection] = useState(DEFAULT_STATE_USER_CONNECTION);

   //Call first time component render-  reset login status - set to logout 
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        dispatch(userActions.userRegisterStep1(userDetails));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      case 1:
        dispatch(userActions.userRegisterStep2(userConnection));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;      
      case 2:
        dispatch(userActions.register(userDetails,userConnection));
        break;      
      default:
        break;      
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setUserDetails(DEFAULT_STATE_USER_DETAILS);
    setUserConnection(DEFAULT_STATE_USER_CONNECTION);
    setActiveStep(0);
  };

  const  handleInputPersonalDetailsValue = (userDetailsInput) => {
    setUserDetails(userDetailsInput);
}

  const  handleInputUserConnectionValue = (userConnectionInput) => {
    setUserConnection(userConnectionInput);
  }

const  getStepContent = () => {
  switch (activeStep) {
    case 0:
      return <PersonalDetails userDetails={userDetails} handleInputPersonalDetails={handleInputPersonalDetailsValue} handleNext={handleNext}/>;
    case 1:
      return <SignUp userConnection={userConnection} handleInputUserConnection={handleInputUserConnectionValue}  handleNext={handleNext} handleBack={handleBack}/>;
    case 2:
      return <FinishRegistering handleNext={handleNext} handleReset={handleReset} ></FinishRegistering>;
    default:
      return 'Unknown step';
  }
}

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Welcom To Weights Tracker App</h1>
      <Stepper className={classes.stepperWrapper} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
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