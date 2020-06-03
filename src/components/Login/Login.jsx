import React from 'react';
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../commons/FormsControls/FormControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginData} from "../../reducer/AuthReducer";
import {Redirect} from "react-router-dom";
import s from '../commons/FormsControls/FormControl.module.css'



const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("email", "email", requiredField, Input) }
            {createField("password", "password", requiredField, Input, {type:"password"}) }
            {createField(null, "remember", null, Input, {type:"checkbox"}, "Remember me") }

            {/*<div>*/}
            {/*    <Field*/}
            {/*        placeholder={"password"}*/}
            {/*        component={Input}*/}
            {/*        validate={requiredField}*/}
            {/*        name={"password"}*/}
            {/*        type={'password'}*/}
            {/*    />*/}
            {/*</div>*/}
            {error &&
            <div className={s.formError}>
                {error}
            </div>
            }

            <div>
                <button>Submit</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);


const Login = ({loginData, isAuth}) => {
    const onSubmit = ({email, password, remember}) => {
        loginData(email,password, remember)

    };
    if(isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = ({authUser}) => ({
    isAuth: authUser.isAuth
});

export default connect(mapStateToProps, {loginData})(Login);