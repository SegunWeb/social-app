import React from 'react';
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../commons/FormsControls/FormControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {getCaptchaUrl, loginData} from "../../reducer/AuthReducer";
import {Redirect} from "react-router-dom";
import s from '../commons/FormsControls/FormControl.module.css'



const LoginForm = ({handleSubmit, error, captchaUrl}) => {
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

            {captchaUrl && <img src={captchaUrl} alt="captcha"/> }
            {captchaUrl && createField("enter symbols", "captcha", requiredField, Input, {}) }

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


const Login = ({loginData, isAuth, captchaUrl}) => {
    const onSubmit = ({email, password, remember, captcha}) => {
        loginData(email,password, remember, captcha)

    };
    if(isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );
};

const mapStateToProps = ({authUser, captchaUrl}) => ({
    captchaUrl: authUser.captchaUrl,
    isAuth: authUser.isAuth
});

export default connect(mapStateToProps, {loginData, getCaptchaUrl})(Login);