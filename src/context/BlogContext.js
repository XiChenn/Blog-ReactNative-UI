import createDataContext from './createDataContext';
import _ from 'lodash';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return {..._.mapKeys(action.payload, 'id')}
        case 'delete_blogpost':
            return _.omit(state, action.payload);
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
    return async (title, content, callback) => {
        await jsonServer.post('/posts', { title, content })

        if (callback) {
            callback();
        }
    }
};

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/posts/${id}`, { id, title, content });

        dispatch({ type: 'edit_blogPost', payload: {id, title, content} });

        if (callback) {
            callback();
        }
    }
};

const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/posts/${id}`);
        dispatch({ type: 'delete_blogpost', payload: id });
    }
}

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, editBlogPost, deleteBlogPost, getBlogPosts },
    {}
);
