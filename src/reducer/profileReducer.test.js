import ProfileReducer, {addPostActionCreator, deletePost} from './ProfileReducer'
import React from "react";


let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
};

it('new post should be added', () => {
    // 1 test data
    let action =  addPostActionCreator("test text");
    // 2 init state, action
    let newState = ProfileReducer(state, action,);
    // expectation text
    expect(newState.posts.length).toBe(5);
});

it('message of new post should be correct', () => {
    // 1 test data
    let action =  addPostActionCreator("test text");
    // 2 init state, action
    let newState = ProfileReducer(state, action,);
    // expectation text
    expect(newState.posts[4].message).toBe("test text");
});

it('after deleting length of messages should be decrement', () => {
    // 1 test data
    let action =  deletePost(1)
    // 2 init state, action
    let newState = ProfileReducer(state, action,);
    // // expectation text
    expect(newState.posts.length).toBe(3);
});

it(`after deleting length shouldn't be decrement if id in correct`, () => {
    // 1 test data
    let action =  deletePost(1000)
    // 2 init state, action
    let newState = ProfileReducer(state, action,);
    // // expectation text
    expect(newState.posts.length).toBe(4);
});
