import createDataContext from './createDataContext';
import _ from 'lodash';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'delete_blogpost':
            return _.omit(state, action.payload);
        case 'add_blogpost':
            const id = (Math.floor(Math.random() * 99999)).toString();
            return { ...state, [id]: {id, title: `Post ${id}`} };
        default:
            return state;
    }
};

const addBlogPost = dispatch => {
    return () => dispatch({ type: 'add_blogpost' });
};

const deleteBlogPost = dispatch => id => dispatch({ type: 'delete_blogpost', payload: id });

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost },
    {}
);
