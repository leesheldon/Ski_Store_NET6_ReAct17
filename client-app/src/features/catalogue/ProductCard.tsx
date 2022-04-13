import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/util/util";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    const [loading, setLoading] = useState(false);
    const {setBasket} = useStoreContext();

    function handleAddItem(productId: number, quantity: number) {
        setLoading(true);
        agent.Basket.addItem(productId, quantity)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return(
        <Card>
            <CardHeader 
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'warning.light'}
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: "contain", bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color="secondary">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                    loading={loading} 
                    onClick={() => handleAddItem(product.id, 1)}
                    size="small"
                >
                    Add to cart
                </LoadingButton>
                <Button to={`/catalogue/${product.id}`} component={Link} size="small">View</Button>
            </CardActions>
        </Card>
    );
}