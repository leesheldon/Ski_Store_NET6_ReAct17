import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
    message?: string;
}

export default function LoadingComponent({message = 'Loading...'}: Props) {
    return (
        <Backdrop open={true} invisible={true}>
            <Box display='flex' justifyContent='center' justifyItems='center' height='50vh' >
                <CircularProgress size={100} color="secondary" />
                <Typography variant="h4" sx={{ justifyContent: 'center', position: 'fixed', top: '50%' }}>{message}</Typography>
            </Box>
        </Backdrop>
    );
}