import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import {getPartyById, createParty, updateParty} from "../../APIService/APIService"

export const fetchPartyById = createAsyncThunk('parties/fetchPartyById', async (partyId) => {
    const response = await getPartyById(partyId);
    return response.data;
});

export const createNewParty = createAsyncThunk('parties/createNewParty', async (partyName) => {
    const response = await createParty(partyName);
    return response.data;
});

export const updatePartyById = createAsyncThunk('parties/updatePartyById', async (partyId, newPartyName) => {
    const response = await updateParty(partyId, newPartyName);
    return response.data;
});

export const partiesAdapter = createEntityAdapter();

const initialState = partiesAdapter.getInitialState({loading: false, error: false, selectedParty: 1});

const partiesSlice = createSlice({
    name: 'parties',
    initialState,
    reducers: {
        partySelected(state, action) {
            return{
                ...state,
                selectedParty: action.payload,
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPartyById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchPartyById.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(fetchPartyById.fulfilled, (state, action) => {
            partiesAdapter.setAll(state, action.payload);
            state.loading = false;
        });
        builder.addCase(createNewParty.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createNewParty.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(createNewParty.fulfilled, (state, action) => {
            partiesAdapter.addOne(state, action.payload);
            state.loading = false;
        });
        builder.addCase(updatePartyById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updatePartyById.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(updatePartyById.fulfilled, (state, action) => {
            partiesAdapter.updateOne(state, action.payload);
            state.loading = false;
        });
    }
});

export const {
    selectById: selectPartyById,
    selectIds: selectPartyIds,
    selectEntities: selectPartyEntities,
    selectAll: selectAllParties,
    selectTotal: selectTotalParties, 
} = partiesAdapter.getSelectors(state => state.parties);

export const { partySelected } = partiesSlice.actions;

// ############## Simple Selectors ################

export const getCurrentPartyId = state => state.parties.selectedParty;

export default partiesSlice.reducer;
