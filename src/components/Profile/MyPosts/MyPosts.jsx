import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";


const MyPosts = (props) => {
    let postsElements =
        props.posts.map( p => <Post key={p.message} message={p.message} likesCount={p.likesCount}/>);

    // let newPostElement = React.createRef();

    let addNewPostText = (value) => {
        props.addPost(value.newPostText)
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostReduxForm
                onSubmit={addNewPostText}
            />
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
};
const addNewPostForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                placeholder={"enter text"}
                component={"textarea"}
                name={"newPostText"} />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
);
const AddNewPostReduxForm = reduxForm({form: 'ProfileAddNewPostForm'})(addNewPostForm);




export default MyPosts;