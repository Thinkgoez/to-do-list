import { Formik } from 'formik'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'


export const NoteAddForm = ({ handleSubmit, ...props }) => {
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
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group md='6' controlId='newTask'>
                        <Form.Control
                            type='text'
                            name='formValue'
                            className='form-control'
                            placeholder='Введите название разметки'
                            value={values.formValue}
                            onChange={handleChange}
                            autoComplete="off"
                            onBlur={(e) => {
                                setErrors({formValue : ''})
                                handleBlur(e)
                            }}
                            isInvalid={!!errors.formValue}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.formValue}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    )
}

NoteAddForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}