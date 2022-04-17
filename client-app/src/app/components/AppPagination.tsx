import { Box, Pagination, Typography } from "@mui/material";
import { PaginationData } from "../../app/models/pagination";

interface Props {
    paginationData: PaginationData;
    onPageChange: (page: number) => void;
}

export default function AppPagination({paginationData, onPageChange}: Props) {
    const {currentPage, totalCount, totalPages, pageSize} = paginationData;

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(currentPage - 1) * pageSize + 1}-
                {currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize} of 
                {totalCount} items
            </Typography>
            <Pagination 
                color="secondary" 
                size='large' 
                count={totalPages} 
                page={currentPage} 
                onChange={(e, page) => onPageChange(page)}
            />
        </Box>
    );
}