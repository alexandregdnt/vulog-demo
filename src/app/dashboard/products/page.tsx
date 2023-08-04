'use client';

import {useEffect, useState} from "react";
import {useUser} from "@components/context/UserProvider";
import {filterAvailablePackages} from "@/utils/helpers";
import {ProductWithServices} from "@/pages/api/products/all";
import ProductDetails from "@/app/dashboard/products/ProductDetails";

export default function Shop() {
    const { token, user } = useUser();
    const [products, setProducts] = useState<ProductWithServices[]>([]);

    useEffect(() => {
        if (!products || products.length <= 0) handleGetProducts();
    }, [products]);

    const handleGetProducts = () => {
        if (!token?.access_token) {
            console.error('Access token not found in sessionStorage');
            return;
        }
        if (!user) {
            console.error('User unknown');
            return;
        }

        // Append the access token as a query parameter in the URL
        const url = `/api/products/all?access_token=${encodeURIComponent(token.access_token)}`;

        // Call api next /api/user GET
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Handle the response data
                console.log(data);
                setProducts(filterAvailablePackages(data, user));
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch
                console.error('Error fetching data:', error);
            });
    };

    if (!products || !user) return <div>Loading...</div>;

    return (
        <div>
            test
            {products.map((product) => <ProductDetails key={product.id} product={product} />)}
        </div>
    )
}
