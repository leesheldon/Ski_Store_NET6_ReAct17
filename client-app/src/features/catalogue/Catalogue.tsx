import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";


export default function Catalogue() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data)).catch(error => console.log(error))
    }, []);
    
    return (
        <>
            <ProductList products={products} />
        </>
    );
}