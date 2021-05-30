import { Formik } from 'formik';
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { BackButton } from '../common/BackButton';
import { Button } from '../common/Button';

const BtnReset = styled(Button)`
    margin-right: 1rem;
    &:hover{
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
    }
`
const BtnSave = styled(Button)`
    &:hover{
        color: #000;
        background-color: #97ff97;
        border-color: #6c757d;
    }
`
const SettingsButtons = styled.div`
    display: flex;
    justify-content: space-between;
`
const FormLabel = styled.label`
    margin-bottom: .5rem;
    display: inline-block;
`
const inputStyles = `
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 2px solid #ced4da;
    -webkit-appearance: none;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin: .5rem 0;
    resize: vertical;
    &:focus {
        border-color: #97ff97;
        outline: 0;
    }
    &.invalid{
        border-color: red; 
}
`
const FormControl = styled.input`${inputStyles}`
const TextArea = styled.textarea`${inputStyles}
    min-height: calc(1.5em + .75rem + 2px);
`
const Error = styled.div`
    position: absolute;
    display: inline-block;
    bottom: 7%;
    right: 1%;
    padding: 2px 7px;
    font-size: .975em;
    background-color: #fff;
    border-radius: 5px;
    color: red;
    border: 1px red solid;
    font-weight: 600;
`

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
            <form onSubmit={handleSubmit}>
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                    <FormLabel>Title</FormLabel>
                    <FormControl
                        type='text'
                        name='title'
                        className={!!errors.title ? 'invalid' : ''}
                        placeholder='Введите новое название проекта'
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.title}
                        autoComplete='off'
                    />
                    {errors.title && <Error>{errors.title}</Error>}
                </div>

                <div>
                    <FormLabel>Description</FormLabel>
                    <TextArea
                        name='description'
                        placeholder='Введите описание проекта'
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.description}
                    />
                </div>

                <SettingsButtons>
                    <BackButton type='button' />
                    <div>
                        <BtnReset type='button' onClick={resetForm} className='btn'>Reset</BtnReset>
                        <BtnSave className='btn' type='submit'>Save</BtnSave>
                    </div>
                </SettingsButtons>
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