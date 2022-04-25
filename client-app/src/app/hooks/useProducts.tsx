import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors } from "../../features/catalogue/catalogueSlice";
import { useAppDispatch, useAppSelector } from "../store/configStore";

export default function useProducts() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, filtersLoaded, brands, types, paginationData } = useAppSelector(state => state.catalogue)

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());

    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());

    }, [dispatch, filtersLoaded]);
    
    return {
        products,
        productsLoaded,
        filtersLoaded,
        brands,
        types,
        paginationData
    };
}