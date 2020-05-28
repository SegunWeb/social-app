import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../commons/FormsControls/FormControls";
import {requiredField} from "../../utils/validators/validators";


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={"login"}
                    component={Input}
                    validate={requiredField}
                    name={"login"}
                />
            </div>
            <div>
                <Field
                    placeholder={"password"}
                    component={Input}
                    validate={requiredField}
                    name={"password"}
                />
            </div>
            <div>
                Remember me
                <Field
                    type="checkbox"
                    name={"Remember"}
                    component={Input}
                />
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);


const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    };
    return (
        <div>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

export default Login;