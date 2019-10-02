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

    const [data, setdata] = React.useState({  });
    const [errors, setErrors] = React.useState([]);

    const onFormSubmit = (e) => {
        e.preventDefault();

        ValidationSchema
            .isValid(data)
            .then(function (valid) {
                if (valid === false) {
                    console.log("VALID false")
                    ValidationSchema.validate(data, { abortEarly: false })
                        .then(function (values) {
                            console.log(values)
                        })
                        .catch(function (err) {
                            console.log(err.errors)
                            setErrors(err.errors)
                        });
                }
                else {
                    console.log("VALID true")
                }
            })
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