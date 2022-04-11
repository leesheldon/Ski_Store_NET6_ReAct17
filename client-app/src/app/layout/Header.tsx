import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Box, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    { title: 'catalogue', path: '/catalogue' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
];

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
];

const navStyles = { 
    color: 'inherit', 
    typography: 'h6', 
    textDecoration: 'none', 
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
};

export default function Header({darkMode, handleThemeChange}: Props) {
    return(
        // mb --> Bottom margin
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography 
                        exact 
                        variant="h6" 
                        component={NavLink} 
                        to='/' 
                        sx={navStyles}
                    >
                        SKI-STORE
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>
                
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({title, path}) => (
                        <ListItem 
                            component={NavLink} 
                            to={path} 
                            key={path} 
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                
                <Box display='flex' alignItems='center'>
                    <IconButton size="large" sx={{ color: 'inherit' }}>
                        <Badge badgeContent={6} color='warning'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({title, path}) => (
                            <ListItem 
                                component={NavLink} 
                                to={path} 
                                key={path} 
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    );
}