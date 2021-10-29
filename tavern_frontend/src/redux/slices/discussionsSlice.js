import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import {getAllDiscussionsByCategory, createDiscussion, updateDiscussion} from "../../APIService/APIService";

export const fetchAllDiscussionsByCategory = createAsyncThunk('discussions/fetchAllDiscussionsByCategory', async (categoryId) => {
    const response = await getAllDiscussionsByCategory(categoryId)
    return response.data
});

export const createNewDiscussion = createAsyncThunk('discussions/createNewDiscussion', async (args) => {
    const response = await createDiscussion(args.title, args.message, args.categoryId, args.userId)
    return response.data
});

export const updateDiscussionById = createAsyncThunk('discussions/updateDiscussionById', async (discId, title, message, categoryId) => {
    const response = await getAllDiscussionsByCategory(discId, title, message, categoryId)
    return response.data
});

export const discussionsAdapter = createEntityAdapter();

const initialState = discussionsAdapter.getInitialState({loading: false, error: false, bookmarked: []});

const discussionsSlice = createSlice({
    name: 'discussions',
    initialState,
    reducers: {
        discussionSelected(state, action) {},
        bookmarkAdded(state, action) {
            
            state.bookmarked.push(action.payload)
            
        },
        bookmarkRemoved(state, action) {
            const newBookmarked = state.bookmarked;
            const index = newBookmarked.indexOf(action.payload);
            if(index !== -1) {
                state.bookmarked.splice(index, 1)
                
            }
        },

    },
    extraReducers: builder => {
        builder.addCase(fetchAllDiscussionsByCategory.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchAllDiscussionsByCategory.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(fetchAllDiscussionsByCategory.fulfilled, (state, action) => {
            discussionsAdapter.removeAll(state);
            for (const discussion of action.payload['allDiscussionsByCategory']) {
                discussionsAdapter.addOne(state, discussion);
            }
            state.loading = false;
        });
        builder.addCase(createNewDiscussion.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createNewDiscussion.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(createNewDiscussion.fulfilled, (state, action) => {
            discussionsAdapter.addOne(state, action.payload['createDiscussion'].discussion);
            state.loading = false;
        });
        builder.addCase(updateDiscussionById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateDiscussionById.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(updateDiscussionById.fulfilled, (state, action) => {
            discussionsAdapter.updateOne(state, action.payload);
            state.loading = false;
        });
        
    }
});

export const {
    selectById: selectDiscussionById,
    selectIds: selectDiscussionIds,
    selectEntities: selectDiscussionEntities,
    selectAll: selectAllDiscussions,
    selectTotal: selectTotalDiscussions, 
} = discussionsAdapter.getSelectors((state) => state.discussions);

//********* Simple Selectors *************

export const selectBookmarkIds = state => state.discussions.bookmarked;
export const discussionIsBookmarked = (state, id) => state.discussions.bookmarked.indexOf(id) !== -1;

//********* Memoized Selectors **************

/*export const selectDiscussionsByCategory = createSelector(
    [selectAllDiscussions, (state, categoryId) => categoryId],
    (discussions, categoryId) => discussions.filter(discussion => discussion.category === categoryId)
);*/
/*export const selectBookmarkedDiscussions = createSelector(
    [selectAllDiscussions, selectBookmarkIds],
    (discussions, ids) => { discussions.filter((discussion) => ids.indexOf(discussion.id) !== -1)}
);*/

export const {
    discussionAdded, 
    discussionRemoved, 
    discussionSelected,
    bookmarkAdded,
    bookmarkRemoved,
} = discussionsSlice.actions;

export default discussionsSlice.reducer;
