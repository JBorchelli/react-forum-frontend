import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { getAllPostsByDiscussion, createPost, updatePost } from '../../APIService/APIService';

export const fetchAllPostsByDiscussion = createAsyncThunk('posts/fetchAllPostsByDiscussion', async (discId) => {
    const response = await getAllPostsByDiscussion(discId)
    return response.data
});

export const createNewPost = createAsyncThunk('posts/createNewPost', async (args) => {
    const response = await createPost(args.message, args.discId, args.userId)
    return response.data
});

export const updatePostById = createAsyncThunk('posts/updatePostById', async (postId, message) => {
    const response = await updatePost(postId, message)
    return response.data
});


export const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({loading: false, error: false, selectedPost: null});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postSelected(state, action) {
            return{
                ...state,
                selectedPost: action.payload
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAllPostsByDiscussion.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchAllPostsByDiscussion.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(fetchAllPostsByDiscussion.fulfilled, (state, action) => {
            for (const post of action.payload['allPostsByDiscussion']) {
                postsAdapter.addOne(state, post);
            }
            state.loading = false;
        });
        builder.addCase(createNewPost.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createNewPost.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(createNewPost.fulfilled, (state, action) => {
            console.log(action.payload['createPost'].post)
            postsAdapter.addOne(state, action.payload['createPost'].post);
            state.loading = false;
        });
        builder.addCase(updatePostById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updatePostById.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(updatePostById.fulfilled, (state, action) => {
            postsAdapter.updateOne(state, action.payload);
            state.loading = false;
        });
        
    }
});

export const {
    selectById: selectPostById,
    selectIds: selectPostIds,
    selectEntities: selectPostEntities,
    selectAll: selectAllPosts,
    selectTotal: selectTotalPosts, 
} = postsAdapter.getSelectors(state => state.posts);

//############### Simple Selectors ####################
export const selectPostsByDiscussion = (state, discussionId) => Object.values(state.posts.entities).filter(post => post.discussion.id === discussionId);

//############### Memoized Selectors ####################
/*export const selectPostsByDiscussion = createSelector(
    [selectAllPosts],
    (posts, discussionId) => 
        posts.filter(post => post.discussion.id === discussionId)
);*/

export const { postSelected } = postsSlice.actions;

export default postsSlice.reducer;
