import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map( d => <DialogItem key={d.id} name={d.name} id={d.id} />  );
    let messagesElements = state.messages.map( m => <Message key={m.message} message={m.message}/> );
    let newMessageBody = state.newMessageBody;

    let addNewMessage = (value) => {
        props.sendMessage(value.newMessageBody)
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                <div>
                    {messagesElements}
                </div>
                <AddMassageFormRedux
                    onSubmit={addNewMessage}
                />
            </div>
        </div>
    )
};

const addMassageForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                placeholder={"Enter your message"}
                component={'textarea'}
                name={"newMessageBody"}
            />
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>
);

const AddMassageFormRedux = reduxForm({form: "dialogsAddMassageForm"})(addMassageForm);

export default Dialogs;