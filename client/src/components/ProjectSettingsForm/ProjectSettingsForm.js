import { Formik } from 'formik';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'


export const ProjectSettingsForm = ({ handleSubmit, project: { title, description }, ...props }) => {
    return (
        <Formik
            initialValues={{ title: '', description }}
            validate={values => {
                const errors = {};
                if (values.title === title) {
                    errors.title = 'New title cannot be the same as the old value';
                }
                return errors;
            }}
            onSubmit={(values) => {
                const newValues = {
                    title: values.title.trim() ? values.title : title,
                    description: values.description.trim() ? values.description : description
                }
                handleSubmit(newValues)
            }}
        >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
            ...props
        }) =>
        (
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

                <Form.Group className='mt-2' md="6" controlId="validationFormik02">
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
                <div className='d-flex justify-content-end'>
                    <Button onClick={resetForm} variant="secondary" className='mx-3'>Reset</Button>
                    <Button variant="primary" type='submit'>Save</Button>
                </div>

            </Form>
        )
            }
        </Formik>
    )
}

ProjectSettingsForm.propTypes = {
    title: PropTypes.string,
    handleSubmit: PropTypes.func
}