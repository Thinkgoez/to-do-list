import { Formik } from "formik"
import PropTypes from 'prop-types'
import * as Yup from 'yup';
import styled from 'styled-components'

import {
    FormLabel, FormControl,
    TextArea, Error, FormGroup, CheckBox, BtnPrimary,
    BtnSecondary, FormCheck
} from '../common/FormStyledComponents';

const CheckBoxGroup = styled(FormGroup)`
    margin-bottom: 1rem;
`
const btnFromStyles = `
color: #000;
border-color: #000;
&:active{
    border-color: #fff;
}`
const BtnClose = styled(BtnSecondary)`${btnFromStyles}`

const BtnSave = styled(BtnPrimary)`${btnFromStyles}`

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
`

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
            initialValues={{ title: '', description: '', isPublic: false }}
            validationSchema={valSchema}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setErrors,
                handleReset,
                ...props
            }) => (
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>Title</FormLabel>
                        <FormControl
                            type='text'
                            name='title'
                            className={!!errors.title && touched.title ? 'invalid' : ''}
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.title && touched.title}
                            autoComplete='off'
                            placeholder='Введите название нового проекта'
                            value={values.title}
                        />
                        {errors.title && touched.title && <Error>{errors.title}</Error>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Description</FormLabel>
                        <TextArea
                            name='description'
                            className={!!errors.description && touched.description ? 'invalid' : ''}
                            placeholder='Введите описание проекта'
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.description}
                        />
                        {errors.description && touched.description && <Error>{errors.description}</Error>}
                    </FormGroup>
                    <CheckBoxGroup>
                        <FormLabel>Access settings</FormLabel>
                        <FormCheck>
                            <CheckBox
                                type='radio'
                                name='isPublic'
                                onChange={handleChange}
                                id='private'
                                value={false}
                                defaultChecked
                            ></CheckBox>
                            <label htmlFor='private'>Default(private)</label>
                        </FormCheck>
                        <FormCheck>
                            <CheckBox
                                type='radio'
                                name='isPublic'
                                onChange={handleChange}
                                id='pubReadonly'
                                value='readonly'
                            ></CheckBox>
                            <label htmlFor='pubReadonly'>Public(readonly)</label>
                        </FormCheck>
                        <FormCheck>
                            <CheckBox
                                 type='radio'
                                 name='isPublic'
                                 onChange={handleChange}
                                 id='pubWritable'
                                 value='writable'
                            ></CheckBox>
                            <label htmlFor='pubWritable'>Public(writable)</label>
                        </FormCheck>
                    </CheckBoxGroup>
                    <ButtonGroup>
                        <BtnClose type='button' onClick={() => {
                            handleClose()
                            handleReset()
                        }}>Close</BtnClose>
                        <BtnSave type='submit'>Create</BtnSave>
                    </ButtonGroup>
                </form>
            )}
        </Formik>
    )
}

ProjectCreateForm.propTypes = {
    submitForm: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
}