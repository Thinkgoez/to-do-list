import { Formik } from 'formik';
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup'

let registerSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    username: Yup.string().required('Required')
});

export const AuthRegisterForm = ({ handleSubmit, ...props }) => { //submitError,
    return (
        <Formik
            initialValues={{ email: '', password: '', username: '' }}
            validationSchema={registerSchema}
            onSubmit={async (values, {setSubmitting}) => {
                await handleSubmit(values)
                setSubmitting(false)
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                ...props
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <Form.Group controlId='formRegName' className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='username'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            placeholder='Your name'
                            isInvalid={!!errors.username && touched.username}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.username && touched.username && errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='formRegEmail' className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Enter email'
                            isInvalid={!!errors.email && touched.email}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.email && touched.email && errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='formRegPassword' className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Enter password'
                            isInvalid={!!errors.password && touched.password}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {errors.password && touched.password && errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <NavLink className='nav-link float-end' to='/login'>Log in</NavLink>
                    <Button
                        disabled={isSubmitting}
                        variant='dark'
                        type='submit'
                    >Register</Button>

                </Form>
            )}
        </Formik>
    )
}

AuthRegisterForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}