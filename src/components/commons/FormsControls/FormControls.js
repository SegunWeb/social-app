import React from 'react'
import s from './FormControl.module.css'
import {requiredField} from "../../../utils/validators/validators";
import {Field} from "redux-form";


const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
};


export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
};
export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>
    )
};

export const createField = (placeholder, name, validators, component, props = {}, text = "") => (
    <div>
        {text}
        <Field
            placeholder={placeholder}
            component={component}
            validate={validators}
            name={name}
            {...props}
        />
    </div>
);
