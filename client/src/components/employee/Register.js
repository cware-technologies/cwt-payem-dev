import React, { useEffect } from 'react';
import FormSection from '../widgets/FormSection';
import * as Yup from 'yup';
import Validation from '../validation/Validation';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import { amber, green } from '@material-ui/core/colors';
import ErrorIcon from '@material-ui/icons/Error';
import { Route , withRouter} from 'react-router-dom';

const personalInfoFields = [
    { type: 'TextField', label: 'First Name', name: 'fst_name' },
    { type: 'TextField', label: 'Middle Name', name: 'mid_name' },
    { type: 'TextField', label: 'Last Name', name: 'last_name' },
    { type: 'TextField', label: 'ID Number', name: 'iden_num' },
    {
        type: 'Select', label: 'Gender',
        options: [{ label: 'Male', value: 'm' },
        { label: 'Female', value: 'f' },
        ],
        name: 'FLG_01'
    },
    { type: 'Date', label: 'Date of Birth', name: 'ATTRIB_18' },
]

const contactInfoFields = [
    { type: 'TextArea', label: 'Address', name: 'ATTRIB_01' },
    { type: 'TextField', label: 'City', name: 'ATTRIB_07' },
    { type: 'TextField', label: 'State', name: 'ATTRIB_08' },
    { type: 'TextField', label: 'Zip', name: 'ATTRIB_09' },
    { type: 'TextField', label: 'Email', name: 'ATTRIB_10' },
    { type: 'TextField', label: 'Cell #', name: 'ATTRIB_11' },
    { type: 'TextField', label: 'Phone #', name: 'ATTRIB_12' },
]

const workInfoFields = [
    {
        type: 'Select', label: 'Location',
        options: [{ label: 'Location 1', value: '1' }, { label: 'Location 2', value: '2' },
        ],
        name: 'ATTRIB_21'
    },
    { type: 'Date', label: 'Hire Date', name: 'ATTRIB_19' },
]

const payInfoFields = [
    {
        type: 'Select', label: 'Pay Frequency',
        options:
            [
                { label: 'Weekly', value: 'Weekly' },
                { label: 'Biweekly', value: 'Biweekly' },
                { label: 'Semi-Monthly', value: 'Semi-Monthly' },
                { label: 'Monthly', value: 'Monthly' },
                { label: 'Quarterly', value: 'Quarterly' },
                { label: 'Semi-Annually', value: 'Semi-Annually' },
            ],
        name: 'ATTRIB_22'
    },
    {
        type: 'Select', label: 'Pay Type',
        options:
            [
                { label: 'Hourly', value: 'Hourly' },
                { label: 'Salary', value: 'Salary' },
            ],
        name: 'ATTRIB_23'
    },
    {
        type: 'TextField', label: 'Pay Rate', name: 'ATTRIB_13', readOnly: (object) => {
            if (object['ATTRIB_23'] === 'Hourly') {
                return false
            }
            else {
                return true
            }
        }
    },
    {
        type: 'Radio', label: 'Pay Rate Type',
        options:
            [
                { label: 'Annual', value: 'Annual' },
                { label: 'Pay Period', value: 'Pay Period' },
            ],
        name: 'ATTRIB_24',
        readOnly: (object) => {
            if (object['ATTRIB_23'] === 'Salary') {
                return false
            }
            else {
                return true
            }
        }
    },
    {
        type: 'TextField', label: 'Annual Pay Rate', name: 'ATTRIB_14', readOnly: (object) => {
            if (object['ATTRIB_23'] === 'Salary' && object['ATTRIB_24'] == 'Annual') {
                return false
            }
            else {
                return true
            }
        }
    },
    {
        type: 'TextField', label: 'Pay Period Rate', name: 'ATTRIB_14', readOnly: (object) => {
            if (object['ATTRIB_23'] === 'Salary' && object['ATTRIB_24'] == 'Pay Period') {
                return false
            }
            else {
                return true
            }
        }
    },
    {
        type: 'TextField', label: 'Calculated Pay Period', name: 'ATTRIB_15', disabled: true, readOnly: (object) => {
            if (object['ATTRIB_23'] === 'Salary' && object['ATTRIB_24'] == 'Annual') {
                return false
            }
            else {
                return true
            }
        },
    },
    {
        type: 'TextField', label: 'Calculated Annual Amount', disabled: true, name: 'ATTRIB_15', readOnly: (object) => {
            if (object['ATTRIB_23'] === 'Salary' && object['ATTRIB_24'] == 'Pay Period') {
                return false
            }
            else {
                return true
            }
        }, 
    },

]

const Sections = [
    {
        heading: 'Personal Information',
        data: personalInfoFields
    },
    {
        heading: 'Contact Information',
        data: contactInfoFields
    },
    {
        heading: 'Work Information',
        data: workInfoFields
    },
    {
        heading: 'Pay Information',
        data: payInfoFields
    },
]

const ValidationSchema = Yup.object().shape({
    fst_name: Yup.string()
        .min(1, 'First Name Too Short!')
        .max(30, 'First Name Too Long!')
        .required('First Name is Required'),
    mid_name: Yup.string()
        .max(30, 'Middle Name Too Long!'),
    last_name: Yup.string()
        .min(1, 'Last Name Too Short!')
        .max(30, 'Last Name Too Long!')
        .required('Last Name is Required'),
    iden_num: Yup.number()
        .required('Identification Number is Required')
        .typeError('Identification Number Must be a Number')
        .positive("Identification Number Must be a Positive Number")
        .integer("Identification Number Must be an Integer (No Decimals)"),
    FLG_01: Yup.string()
        .required('Gender is Required'),
    ATTRIB_18: Yup.date()
        .required('Date of Birth is Required'),
    ATTRIB_01: Yup.string()
        .max(200, 'Address is Too Long!')
        .required('Address is Required'),
    ATTRIB_07: Yup.string()
        .max(30, 'City is Too Long!')
        .required('City is Required'),
    ATTRIB_08: Yup.string()
        .min(1, ' Too Short!')
        .max(30, 'State is Too Long!')
        .required('State is Required'),
    ATTRIB_09: Yup.number()
        .typeError('Zip Code Must be a Number')
        .positive("Zip Code Must be a Positive Number")
        .integer("Zip Code Must be an Integer (No Decimals)"),
    ATTRIB_10: Yup.string()
        .email("Email is not valid")
        .max(30, 'Email is Too Long!')
        .required('Email is Required'),
    ATTRIB_11: Yup.number()
        .required('Cell Number is Required')
        .typeError('Cell Number Must be a Number')
        .positive("Cell Number Must be a Positive Number")
        .integer("Cell Number Must be an Integer (No Decimals)"),
    ATTRIB_12: Yup.number()
        .typeError('Phone Number Must be a Number')
        .positive("Phone Number Must be a Positive Number")
        .integer("Phone Number Must be an Integer (No Decimals)"),
    ATTRIB_21: Yup.string()
        .min(1, ' Too Short!')
        .max(30, ' Too Long!')
        .required('Work Location is Required'),
    ATTRIB_19: Yup.date()
        .required('Hire Date is Required'),
    ATTRIB_22: Yup.string()
        .max(30, 'Pay Frequency Too Long!')
        .required('Pay Frequency is Required'),
    ATTRIB_23: Yup.string()
        .max(30, 'Pay Type Too Long!')
        .required('Pay Type is Required'),
    ATTRIB_13: Yup.string().when('ATTRIB_23', {
        is: 'Hourly',
        then: Yup.string()
        .max(30, 'Pay Rate Too Long!')
        .required('Pay Rate is Required')
      }),
    ATTRIB_24: Yup.string().when('ATTRIB_23', {
        is: 'Salary',
        then: Yup.string()
        .required('Pay Rate Type is Required')
    }),
    ATTRIB_14: Yup.string().when('ATTRIB_13', {
        is: 'Annual' || 'Pay Period',
        then: Yup.string()
        .max(30, 'Annual Pay Rate Too Long!')
        .required('Annual Pay Rate is Required'),
      }),
    // ATTRIB_15: Yup.string().when('ATTRIB_24',{
    //     is: 'Annual' || 'Pay Period',
    //     then: Yup.string()
    //     .max(30, ' Too Long!')
    //     .required('Calculated Annual Amount is Required')
    // }),
});

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  
  const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  };

const useStyles2 = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));


  function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }

function AddEmployee(props) {
    const classes = useStyles2();
    const initialData = {
        ATTRIB_25: 'active', FLG_02: 'Complete'
    }
    const [data, setdata] = React.useState(initialData);
    const [errors, setErrors] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        let err = await Validation(ValidationSchema, data, )
        if (err.isValid === false) {
            console.log(err.isValid)
            setErrors(err.errors);
        } else {
            console.log(err.isValid)
            axios.post(`http://localhost:4000/employees`, { data })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    setOpen(true);
                    
                })
            console.log(data)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        
        setOpen(false);
        setdata({ ...initialData });
        props.history.push("/employees");
      }

    const onChangeValue = (e) => {
        let name = e.target.name
        let value = e.target.value
        setdata({ ...data, [name]: value })
    }

    return (
        <div>
            <FormSection
                data={data}
                fields={Sections}
                handleChange={onChangeValue}
                inputValues={data}
                onFormSubmit={onFormSubmit}
                errors={errors}
            />

            <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="success"
          message="Employee is Created!"
        />
      </Snackbar>
        </div>
    )
}

export default withRouter(AddEmployee)