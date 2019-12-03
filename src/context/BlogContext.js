import createDataContext from './createDataContext';
import _ from 'lodash';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return {..._.mapKeys(action.payload, 'id')}
        case 'delete_blogpost':
            return _.omit(state, action.payload);
        case 'add_blogpost':  
            const newId = (Math.floor(Math.random() * 99999)).toString();
            return { ...state, [newId]: {id: newId, title: action.payload.title, content: action.payload.content} };
        case 'edit_blogPost': {
            const { id, title, content } = action.payload;
            return { ...state, [id]: { id, title, content } };
        }
        default:
            return state;
    }
};

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/posts');
        dispatch({ type: 'get_blogposts', payload: response.data });
    };
};

const addBlogPost = dispatch => {
    return (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: {title, content} });

        if (callback) {
            callback();
        }
    }
};

const editBlogPost = dispatch => {
    return (id, title, content, callback) => {
        console.log(id);
        console.log(title);
        dispatch({ type: 'edit_blogPost', payload: {id, title, content} });

        if (callback) {
            callback();
        }
    }
};

const deleteBlogPost = dispatch => id => dispatch({ type: 'delete_blogpost', payload: id });

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, editBlogPost, deleteBlogPost, getBlogPosts },
    {}
);
