import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { PaginationData } from "../../app/models/pagination";
import { Product, ProductParams } from "../../app/models/product";
import { RootState } from "../../app/store/configStore";

interface CatalogueState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;
    paginationData: PaginationData | null;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);

    if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if (productParams.brands.length > 0) params.append('brands', productParams.brands.toString());
    if (productParams.types.length > 0) params.append('types', productParams.types.toString());

    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    'catalogue/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalogue.productParams)

        try {
            const response = await agent.Catalogue.list(params);
            thunkAPI.dispatch(setPaginationData(response.paginationData));

            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalogue/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalogue.details(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const fetchFilters = createAsyncThunk(
    'catalogue/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalogue.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands: [],
        types: []
    };
}

export const catalogueSlice = createSlice({
    name: 'catalogue',
    initialState: productsAdapter.getInitialState<CatalogueState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams: initParams(),
        paginationData: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload, pageNumber: 1};
        },
        resetProductParams: (state) => {
            state.productParams = initParams();
        },
        setPaginationData: (state, action) => {
            state.paginationData = action.payload;
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload};
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });

        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });

        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });

        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });

        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });

        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = 'idle';
        });

        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });

    })
});

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalogue);

export const {setProductParams, resetProductParams, setPaginationData, setPageNumber} = catalogueSlice.actions;
