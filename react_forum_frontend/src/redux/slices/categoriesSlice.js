import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import {getAllCategoriesByParty, createCategory, updateCategory} from "../../APIService/APIService";

export const fetchCategoriesByParty = createAsyncThunk('categories/fetchCategoriesByParty', async (partyId) => {
    const response = await getAllCategoriesByParty(partyId)
    return response.data
});

export const createNewCategory = createAsyncThunk('categories/createNewCategory', async (args) => {
    const response = await createCategory(args.name, args.partyId)
    return response.data
});

export const updateCategoryById = createAsyncThunk('categories/updateCategoryById', async (args) => {
    const response = await updateCategory(args.categoryId, args.categoryName)
    return response.data
});

export const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState({loading: false, error: false, selectedCategory: "1", previousCategory: "", showAllCategories: false});

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categorySelected(state, action) {
            return {
                ...state,
                selectedCategory: action.payload,
        }},
        setShowAllCategories(state, action) {
            return{
                ...state,
                showAllCategories: action.payload,
            }  
        },
        previousCategorySet(state, action) {
            return{
                ...state,
                previousCategory: action.payload,
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCategoriesByParty.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchCategoriesByParty.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(fetchCategoriesByParty.fulfilled, (state, action) => {
            categoriesAdapter.removeAll(state);
            for (const category of action.payload['allCategoriesByParty']) {
                categoriesAdapter.addOne(state, category);
            }
            state.loading = false;
        });
        builder.addCase(createNewCategory.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createNewCategory.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(createNewCategory.fulfilled, (state, action) => {
            categoriesAdapter.addOne(state, action.payload['createCategory'].category);
            state.loading = false;
        });
        builder.addCase(updateCategoryById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateCategoryById.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(updateCategoryById.fulfilled, (state, action) => {
            categoriesAdapter.updateOne(state, action.payload);
            state.loading = false;
        });
    }
});

export const {
            categorySelected,
            setShowAllCategories,
            previousCategorySet,
            } = categorySlice.actions;

export const {
    selectById: selectCategoryById,
    selectIds: selectCategoryIds,
    selectEntities: selectCategoryEntities,
    selectAll: selectAllCategories,
    selectTotal: selectTotalCategories, 
} = categoriesAdapter.getSelectors(state => state.categories);

//################### Simple Selectors ######################

export const selectCurrentCategory = state => state.categories.selectedCategory;
export const selectShowAllCategories = state => state.categories.showAllCategories;

//################## Memoized Selectors #####################

export default categorySlice.reducer;

