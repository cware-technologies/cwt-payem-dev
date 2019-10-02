import React from 'react';
import FormSection from '../widgets/FormSection';
import * as Yup from 'yup';

const DeductionFields = [
    { type: 'TextField', label: 'Name', name: 'val' },
    { type: 'TextArea', label: 'Description', name: 'ATTRIB_03'  },
    {
        type: 'Select', label: 'Method', options: [{ label: 'Method 1', value: 'method1' },
        { label: 'Method 2', value: 'method2' },
        ], 
        name: 'ATTRIB_06'
    },
    { type: 'TextField', label: 'Amount', name: 'ATTRIB_14' },
    { type: 'TextField', label: 'Amount Per Day', name: 'ATTRIB_15' },
]

const Sections = [
    {
        heading: 'Deduction Details',
        data: DeductionFields
    },
]

const ValidationSchema = Yup.object().shape({
    val: Yup.string()
        .max(30, 'Name is Too Long!')
        .required('Name is Required'),
    ATTRIB_03: Yup.string()
        .max(50, 'Description is Too Long'),
    ATTRIB_06: Yup.string()
        .required('Method is Required'),
    ATTRIB_14: Yup.number()
        .typeError('Amount Must be a Number')
        .positive("Amount Must be a Positive Number")
        .integer("Amount Must be an Integer (No Decimals)"),
    ATTRIB_15: Yup.number()
        .typeError('Amount Per Day Must be a Number')
        .positive("Amount Per Day Must be a Positive Number")
        .integer("Amount Per Day Must be an Integer (No Decimals)"),
});

export default function AddDeduction() {

    const [data, setdata] = React.useState({  });
    const [errors, setErrors] = React.useState([]);

    const onFormSubmit = (e) => {
        e.preventDefault();

        ValidationSchema
            .validate(data, { abortEarly: false })
            .then(function (values) {
                console.log(values)
            })
            .catch(function (err) {
                console.log(err.errors)
                setErrors(err.errors)
            });
    }

    const onChangeValue = (e) => {
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
                onFormSubmit = {onFormSubmit}
                errors = {errors}
            />
        </div>
    )
}
