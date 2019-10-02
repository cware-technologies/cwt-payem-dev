import React, { useEffect } from 'react';
import FormSection from '../widgets/FormSection';
import * as Yup from 'yup';
import Validation from '../validation/Validation';
import axios from 'axios';
import { Checkbox } from '../../../node_modules/@material-ui/core';

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
    { type: 'TextField', label: 'Pay Rate', name: 'ATTRIB_13' },
    {
        type: 'Checkbox', label: 'Pay Rate Type',
        options:
            [
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
            ],
        name: 'ATTRIB_24'
    },
    { type: 'TextField', label: 'Annual Pay Rate', name: 'ATTRIB_14' },
    { type: 'TextField', label: 'Annual Amount', name: 'ATTRIB_15' },
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
    iden_num: Yup.string()
        .min(1, 'ID Number is Too Short!')
        .max(30, 'ID Number is Too Long!')
        .required('ID Number is is Required'),
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
    ATTRIB_09: Yup.string()
        .max(30, 'Zip is Too Long!')
        .required('Zip is Required'),
    ATTRIB_10: Yup.string()
        .max(30, 'Email is Too Long!')
        .required('Email is Required'),
    ATTRIB_11: Yup.string()
        .max(20, 'Cell# is Too Long!')
        .required('Cell# is Required'),
    ATTRIB_12: Yup.string()
        .max(20, 'Phone Number is Too Long!'),
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
    ATTRIB_13: Yup.string()
        .max(30, 'Pay Rate Too Long!')
        .required('Pay Rate is Required'),
    // ATTRIB_24: Yup.string()
    //     .required('Pay Rate Type is Required'),
    ATTRIB_14: Yup.string()
        .max(30, ' Too Long!')
        .required('Annual Pay Rate is Required'),
    ATTRIB_15: Yup.string()
        .max(30, ' Too Long!')
        .required('Annual Amount is Required'),
});

export default function AddEmployee() {
    const [data, setdata] = React.useState({ATTRIB_25: 'active', FLG_02: 'complete'});
    const [errors, setErrors] = React.useState([]);

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
                })
                console.log(data)
        }
    }

    useEffect(() => {
        console.log(data)
    })

    const onChangeValue = (e) => {
        console.log("Name: ", e.target.name)
        console.log("Value: ", e.target.value)
        let name = e.target.name
        let value = e.target.value
        setdata({ ...data, [name]: value })
        
    }

    return (
        <div>
            <FormSection
                fields={Sections}
                handleChange={onChangeValue}
                inputValues={data}
                onFormSubmit={onFormSubmit}
                errors={errors}
            />
        </div>
    )
}