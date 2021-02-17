import { Formik } from 'formik';
import PropTypes from 'prop-types'

export const ProjectSettingsForm = ({handleSubmit, title, ...props}) => {
    return (
        <Formik
            initialValues={{ title: '', userID: '' }}
            validate={values => {
                const errors = {};
                if (values.title === title) {
                    errors.title = 'New title cannot be the same as the old value';
                }
                return errors;
            }}
            onSubmit={(values, { resetForm }) => {
                handleSubmit(values)
                resetForm({ values: { title: '', userID: '' } })
            }}
        >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            ...props
        }) =>
        (
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Title:</label>
                    <input
                        type='text'
                        name='title'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        className='form-control'
                        placeholder='New title'
                    />
                </div>

                {errors.title && touched.title && errors.title}
                <div className='form-group'>
                    <label>Add new user to project:</label>
                    <input
                        type='text'
                        name='userID'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userID}
                        className='form-control'
                        placeholder='Enter userID'
                    />
                </div>
                {errors.userID && touched.userID && errors.userID}
                <button type='submit' disabled={isSubmitting} className='btn btn-secondary'>Save</button>
            </form>
        )
            }
        </Formik>
    )
}

ProjectSettingsForm.propTypes = {
    title: PropTypes.string,
    handleSubmit: PropTypes.func
}