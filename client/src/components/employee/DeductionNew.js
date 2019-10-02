import React from 'react';
import FormSection from '../widgets/FormSection';
import * as Yup from 'yup';
import Validation from '../validation/Validation';
import axios from 'axios';

const newDeductionFields = [
    {
        type: 'Select', label: 'Deduction',
        options: [{ label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        ],
        name: 'type'
    },
    {
        type: 'Select', label: 'Method',
        options: [{ label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        ],
        name: 'ATTRIB_21'
    },
    { type: 'TextField', label: 'Amount Limit', name: 'ATTRIB_11' },
    { type: 'TextField', label: 'Amount Per Pay', name: 'ATTRIB_12' },
    {
        type: 'Checkbox', label: '',
        options:
        [
            { label: 'Active', value: '1' },
        ],
        name: 'FLG_01'
    }
]

const Sections = [
    {
        heading: 'Deduction Details',
        data: newDeductionFields
    }
]

const ValidationSchema = Yup.object().shape({
    type: Yup.string()
        .required('Deductions is Required'),
    ATTRIB_11: Yup.string()
        .required('Amount Limit is Required')
        .max(30, 'Amount Limit Too Long!'),
});

export default function DeductionNew() {
    const [data, setdata] = React.useState({});
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
        }
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
                onFormSubmit={onFormSubmit}
                errors={errors}
            />
        </div>
    )
}