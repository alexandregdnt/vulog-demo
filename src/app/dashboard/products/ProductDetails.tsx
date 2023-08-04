import {ProductWithServices} from "@/pages/api/products/all";

export default function ProductDetails ({product}: {product: ProductWithServices}) {
    return (
        <div>
            <h5>{product.name}</h5>
            <p>Price: {product.price}</p>
            <div>{product.services.map(service => <span>{service.name}</span>)}</div>
        </div>
    )
}
