import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Select from './Select';
import CheckBoxes from './CheckBoxes';
import classNames from 'classnames';
import { FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    root: {
        flexGrow: 1,
    },
    test: {
        backgroundColor: '',
        width: '70%',
    },
    test2: {
        backgroundColor: '',
        width: '20%',
    },
}));

export default function FormSection(props) {
    const classes = useStyles();
    const getFormFields = (field) => {
        switch (field.type) {
            case 'TextField':
                return (
                    <Grid item xs={4}>
                    {console.log(props.data[field.name])}
                        <TextField
                            id="outlined-name"
                            name={field.name}
                            label={field.label}
                            value={props.data[field.name]}
                            onChange={props.handleChange}
                            disabled={field.disabled}
                            margin="normal"
                            variant="outlined"
                            className={classes.textField}
                            onBlur={props.handleBlur}
                            style={field.readOnly && field.readOnly(props.data) === true ? { display: 'none' } : {}}
                        />
                    </Grid>
                )
            case 'Select':
                return (
                    <Grid item xs={4}>
                        <Select
                            id="outlined-name"
                            name={field.name}
                            label={field.label}
                            options={field.options}
                            value={props.inputValues[field.name]}
                            onChange={props.handleChange}
                        />
                    </Grid>
                )
            case 'TextArea':
                return (
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-multiline-static"
                            label={field.label}
                            multiline
                            rows="4"
                            defaultValue=""
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            name={field.name}
                            onChange={props.handleChange}
                        />
                    </Grid>
                )
            case 'Date':
                return (
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-multiline-static"
                            label={field.label}
                            type='date'
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            name={field.name}
                            onChange={props.handleChange}
                        />
                    </Grid>
                )
            case 'Checkbox':
                return (
                    <Grid item xs={4}>
                        <CheckBoxes
                            label={field.label}
                            options={field.options}
                            disabled={field.readOnly && field.readOnly(props.data)}
                        />
                    </Grid>
                )
            case 'Radio':
                return (
                    <Grid items xs={4}>
                        <FormControl disabled={field.readOnly && field.readOnly(props.data)} componnt="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">{field.label}</FormLabel>
                            <RadioGroup aria-label="gender" name={field.name} value={props.data[field.name]} onChange={props.handleChange}>
                                {
                                    field.options.map(option=>{
                                        return(
                                            <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                )
            case 'Empty':
                return (
                    <Grid item xs={4}>

                    </Grid>
                )
            default: return (
                <div>
                    <p>Form Field type Not Identified</p>
                </div>
            )
        }
    }

    const extra = (length) => {
        let arr = []
        let empty = 0

        if (length > 3 && empty == 0) {
            if (length % 3 == 2) {
                empty++
            }
            if (length % 3 == 1) {
                empty = empty + 2
            }
        }

        if (length < 3 && empty == 0) {
            if (length == 2) {
                empty++
            }
            if (length == 1) {
                empty = empty + 2
            }
        }

        for (var i = 0; i < empty; i++) {
            arr.push(
                <Grid item xs={4}>
                </Grid>
            )
        }
        return arr;
    }

    return (
        <div className={classes.main}>
            <Container className="mt-5" className={classes.test}>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={props.onFormSubmit}>
                    {
                        props.fields.map(field => {
                            return (
                                <React.Fragment>
                                    <Typography variant="overline">
                                        {field.heading}
                                    </Typography>
                                    <Divider light />

                                    <Grid container justify="center" className="mt-2" spacing={0}>
                                        {
                                            field.data.map(data =>
                                                getFormFields(data)
                                            )
                                        }
                                        {
                                            extra(field.data.length)
                                        }
                                    </Grid>
                                </React.Fragment>
                            )
                        })
                    }
                    <Button variant="contained" color="primary" type="submit" className={classes.button} >
                        Save
                    </Button>
                </form>
            </Container>
            <Container className={classNames(classes.test2, "mt-5")}>
                <ul>
                    {props.errors.map(error =>
                        <li>
                            <FormHelperText error>
                                {error}
                            </FormHelperText>
                        </li>
                    )}
                </ul>
            </Container>
        </div>
    );
}