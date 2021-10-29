import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const initialState = { categoryDrawerOpen: true, 
                       navMode: 0, 
                       recent: true, 
                       week: false, 
                       loading: false,
                       error: false,
                       twoWeek: false, 
                       month: false, 
                       bookmark: false, 
                       unread: true,
                       selectedParty: null,
                       user: {}, 
                       all: false
                    };

const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {
        
        discussionSelected(state, action) {state.forum.selectedCategory = action.payload},
        postSelected(state, action) {state.forum.selectedCategory = action.payload},
        categoryDrawerToggled(state, action) {
            const open = state.categoryDrawerOpen;
            return {
                ...state,
                categoryDrawerOpen: !open,
            }
        },
        userToggled(state, action) {
            const user = state.user;
            return {
                ...state,
                user: {
                    ...user,
                    [action.payload]: !user[action.payload] 
                }
            }
        },
        navModeChanged(state, action) {
            return{
                ...state,
                navMode: action.payload,
            }
        },
        recentToggled(state, action) {
            const recent = state.recent;
            return {
                ...state,
                recent: !recent,
            }
        },
        weekToggled(state, action) {
            const week = state.week;
            return {
                ...state,
                week: !week,
            }
        },
        twoWeekToggled(state, action) {
            const twoWeek = state.twoWeek;
            return {
                ...state,
                twoWeek: !twoWeek,
            }
        },
        monthToggled(state, action) {
            const month = state.month
            return {
                ...state,
                month: !month,
            }
        },
        bookmarkToggled(state, action) {
            const bookmark = state.bookmark;
            return {
                ...state,
                bookmark: !bookmark,
            }
        },
        unreadToggled(state, action) {
            const unread = state.unread;
            return {
                ...state,
                unread: !unread,
            }
        },
        allToggled(state, action) {
            const all = state.all;
            return {
                ...state,
                all: !all,
            }
        }
        
    }
});

export const {categorySelected, 
              discussionSelected, 
              postSelected, 
              categoryDrawerToggled, 
              navModeChanged,
              userToggled,
              recentToggled,
              weekToggled,
              twoWeekToggled,
              monthToggled,
              bookmarkToggled,
              unreadToggled,
              allToggled
             } = forumSlice.actions;

export default forumSlice.reducer;
