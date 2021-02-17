import { Formik } from "formik"
import PropTypes from 'prop-types'
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const valSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),
});

export const ProjectCreateForm = ({ submitForm, handleClose, ...props }) => {
    const handleSubmit = (values) => {
        submitForm(values)
        handleClose()
    }

    return (
        <Formik
            initialValues={{ title: '', description: '' }}
            validationSchema={valSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
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
                    <Form.Group md="6" controlId="validationFormik01">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            name='title'
                            className='form-control'
                            placeholder='Введите название нового проекта'
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group md="6" controlId="validationFormik02">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as='textarea'
                            name='description'
                            className='form-control my-2'
                            placeholder='Введите описание проекта'
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" type='submit'>Create</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

ProjectCreateForm.propTypes = {
    submitForm: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
}