import {configureStore} from '@reduxjs/toolkit';
import authorizationReducer from './slices/authorizationSlice';
import partiesReducer from './slices/partiesSlice';
import usersReducer from './slices/usersSlice';
import forumReducer from './slices/forumSlice';
import categoriesReducer from './slices/categoriesSlice';
import discussionsReducer from './slices/discussionsSlice';
import postsReducer from './slices/postsSlice';
import preferencesReducer from './slices/preferencesSlice';

const store = configureStore({
    reducer: {
        authorization: authorizationReducer,
        parties: partiesReducer,
        users: usersReducer,
        forum: forumReducer,
        categories: categoriesReducer,
        discussions: discussionsReducer,
        posts: postsReducer,
        preferences: preferencesReducer,
    }
})

export default store;