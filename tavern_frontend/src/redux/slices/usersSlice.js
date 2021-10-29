import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
//import {getAllUsers} from "../../fake_api/fakeApi";
import {getAllAdventurersByParty, getUserById, createAdventurer, updateAdventurer} from "../../APIService/APIService"

export const fetchUsersByParty = createAsyncThunk('users/fetchUsersByParty', async (partyId) => {
    const response = await getAllAdventurersByParty(partyId);
    return response.data;
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
    const response = await getUserById(userId);
    return response.data;
});

export const createNewUser = createAsyncThunk('users/createNewUser', async (userName, email, partyId) => {
    const response = await createAdventurer(userName, email, partyId);
    return response.data;
});

export const updateUserById = createAsyncThunk('users/updateUserById', async (userId, userName, email) => {
    const response = await updateAdventurer(userId, userName, email);
    return response.data;
});


export const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({loading: false, error: false, currentUser: 2, userColors: []});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        currentUserSet(state, action) {
            return {
                ...state,
                currentUser: action.payload
            }
        },

        setUserColor(state, action) {
            state.userColors.push(action.payload);
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchUsersByParty.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchUsersByParty.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(fetchUsersByParty.fulfilled, (state, action) => {
            usersAdapter.removeAll(state);
            for (const user of action.payload['allAdventurersByParty']) {
                usersAdapter.addOne(state, user.adventurer);
            }
            state.loading = false;
        });
        builder.addCase(fetchUserById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchUserById.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createNewUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createNewUser.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(createNewUser.fulfilled, (state, action) => {
            usersAdapter.addOne(state, action);
            state.loading = false;
        });
        builder.addCase(updateUserById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateUserById.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(updateUserById.fulfilled, (state, action) => {
            usersAdapter.updateOne(state, action);
            state.loading = false;
        });
    }
});

export const {
    selectById: selectUserById,
    selectIds: selectUserIds,
    selectEntities: selectUserEntities,
    selectAll: selectAllUsers,
    selectTotal: selectTotalUsers, 
} = usersAdapter.getSelectors(state => state.users);

export const { currentUserSet, setUserColor } = usersSlice.actions;

//################### Simple Selectors ######################

export const selectCurrentUser = state => {
    const id = state.users.currentUser
    return selectUserById(state, id);
}

export const selectUserColor = (state, id) => {
    const userColor = state.users.userColors[id];

    if(userColor) {
        return userColor.color
    }

}

//################## Memoized Selectors #####################

export default usersSlice.reducer;
