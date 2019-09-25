import React from 'react';
import FormSection from '../widgets/FormSection';
import * as Yup from 'yup';

const Fields = [
    { type: 'TextField', label: 'Name', name: 'val' },
    { type: 'TextArea', label: 'Description', name: 'ATTRIB_01' },
    { type: 'TextField', label: 'Taxable', name: 'FLG_01' },
    {
        type: 'Checkbox', label: '', 
        options: [{label: 'Active'}],
        name: 'FLG_02'
    },
    
    { type: 'TextField', label: 'Code', name: 'ATTRIB_05' },
]

const Sections = [
    {
        heading: 'Code Details',
        data: Fields
    },
]

const ValidationSchema = Yup.object().shape({
    val: Yup.string()
        .max(30, 'Name is Too Long!')
        .required('Name is Required'),
    ATTRIB_01: Yup.string()
        .max(100, 'Description is Too Long!'),
    ATTRIB_05: Yup.string()
        .max(30, 'Code is Too Long!'),
});

export default function AddCode() {

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
                validationSchema = { ValidationSchema }
            />
        </div>
    )
}