import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configStore";
import { setProductParams } from "./catalogueSlice";

export default function ProductSearch() {
    const {productParams} = useAppSelector(state => state.catalogue);
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}));
    }, 1000);

    return (
        <TextField 
            label='Search products' 
            variant="outlined" 
            fullWidth 
            value={searchTerm || ''} 
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    );
}