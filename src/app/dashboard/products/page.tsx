'use client';

import {useEffect, useState} from "react";
import {useUser} from "@components/context/UserProvider";
import {filterAvailablePackages} from "@/utils/helpers";
import Table from "@components/Table/Table";
import {SystemCreditsPackage} from "@/vulog/systemCredits";
import {AgeLimitation} from "../../../../data/extra.config";

export default function Shop() {
    const { token, user } = useUser();
    const [packages, setPackages] = useState<(SystemCreditsPackage & { ageLimit?: AgeLimitation })[]>([]);

    useEffect(() => {
        console.log('packages', packages)
        if (!packages || packages.length <= 0) handleGetPackages();
    }, [packages]);

    const handleGetPackages = () => {
        if (!token?.access_token) {
            console.error('Access token not found in sessionStorage');
            return;
        }
        if (!user) {
            console.error('User unknown');
            return;
        }

        // Append the access token as a query parameter in the URL
        const url = `/api/systemCredits?access_token=${encodeURIComponent(token.access_token)}`;

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
                setPackages(filterAvailablePackages(data, user));
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch
                console.error('Error fetching data:', error);
            });
    };

    const headers = ['NAME','LIMITE AGE' ,'PRICE (€)', 'CREDITS', 'VALIDE (days)'];
    const data = packages.map((product) => {
        return [
            product.name,
            product.ageLimit ? `${product.ageLimit.operator} ${product.ageLimit.age} years` : 'None',
            product.price,
            product.systemCreditsAvailable,
            product.validityDays,
            // product.services.map(service => service.name).join(', ')
        ];
    });

    if (!packages || !user) return <div>Loading...</div>;

    return (
        <div>
            {/*{packages.map((product) => <ProductDetails key={product.id} product={product} />)}*/}
            <Table headers={headers} data={data}  title={'Packages'}/>
        </div>
    )
}
