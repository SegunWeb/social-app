import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../commons/FormsControls/FormControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginData} from "../../reducer/AuthReducer";
import {Redirect} from "react-router-dom";
import s from '../commons/FormsControls/FormControl.module.css'



const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={"email"}
                    component={Input}
                    validate={requiredField}
                    name={"email"}
                />
            </div>
            <div>
                <Field
                    placeholder={"password"}
                    component={Input}
                    validate={requiredField}
                    name={"password"}
                    type={'password'}
                />
            </div>
            <div>
                Remember me
                <Field
                    type="checkbox"
                    name={"remember"}
                    component={Input}
                />
            </div>
            {props.error &&
            <div className={s.formError}>
                {props.error}
            </div>
            }

            <div>
                <button>Submit</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);


const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginData(formData.email, formData.password, formData.remember)

    };
    if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.authUser.isAuth
});

export default connect(mapStateToProps, {loginData})(Login);