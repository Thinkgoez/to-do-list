import *as React from 'react';
import { Formik } from "formik"
import PropTypes from 'prop-types'


const Form = ({ handleSubmit, ...props }) => {
    return (
        <Formik
            initialValues={{ formValue: '' }}
            validate={values => {
                const errors = {};
                if (!values.formValue.trim()) {
                    errors.formValue = "Shouldn't be empty";
                }
                return errors;
            }}
            validateOnBlur={false}
            // validateOnChange={false}
            onSubmit={(values, { resetForm }) => {
                handleSubmit(values)
                resetForm({ values: { formValue: '' } })
            }}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setErrors,
                ...props
            }) => (
                <>
                    {errors.formValue}
                    {/* {console.log(props)} */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="formValue"
                                className="form-control"
                                placeholder="Введите название разметки"
                                value={values.formValue}
                                onChange={handleChange}
                                onBlur={(e) => {
                                    setErrors(errors.formValue = "")
                                    handleBlur(e)
                                }}
                            />
                        </div>
                    </form>
                </>
            )
            }
        </Formik>
    )
}

Form.propTypes = {
    handleSubmit: PropTypes.func
}

export default Form