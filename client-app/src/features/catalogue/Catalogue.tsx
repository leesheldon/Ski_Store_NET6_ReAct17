import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configStore";
import { fetchProductsAsync, productSelectors } from "./catalogueSlice";
import ProductList from "./ProductList";


export default function Catalogue() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status } = useAppSelector(state => state.catalogue)

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());

    }, [productsLoaded, dispatch]);

    if (status.includes('pending')) return <LoadingComponent message='Loading products...' />
    
    return (
        <>
            <ProductList products={products} />
        </>
    );
}