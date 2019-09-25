import React from 'react';
import FormSection from '../widgets/FormSection';
import * as Yup from 'yup';

const Fields = [
    { type: 'TextField', label: 'Name', name: 'val' },
    { type: 'TextField', label: 'Amount From', name: 'ATTRIB_11' },
    { type: 'TextField', label: 'Amount Upto', name: 'ATTRIB_12' },
    { type: 'TextField', label: 'Fixed Amount', name: 'ATTRIB_13' },
    { type: 'TextField', label: '% Tax', name: 'ATTRIB_17' },
    { type: 'TextArea', label: 'Description', name: 'ATTRIB_02' },
]

const Sections = [
    {
        heading: 'Tax Details',
        data: Fields
    },
]

const ValidationSchema = Yup.object().shape({
    val: Yup.string()
        .max(30, 'Name is Too Long!')
        .required('Name is Required'),
    ATTRIB_11: Yup.string()
        .required('Amount From is Required'),
    ATTRIB_12: Yup.string()
        .required('Amount Upto is Required'),
    ATTRIB_02: Yup.string()
        .max(100, 'Description is Too Long!'),
});

export default function AddTax() {

    const [data, setdata] = React.useState({

    });

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
                validationSchema = {ValidationSchema}
            />
        </div>
    )
}
