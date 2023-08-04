'use client';

import { useState, useEffect, FC } from "react";
import { HiOutlineMail, HiOutlinePhone, HiUser, HiOutlineOfficeBuilding, HiCheckCircle, HiXCircle, HiCake } from "react-icons/hi";
import {Service} from "@/vulog/users";
import {useUser} from "@components/context/UserProvider";
import {HiArrowSmallDown, HiArrowSmallRight, HiArrowSmallUp} from "react-icons/hi2";

export default function Profile() {
    const { token } = useUser();
    const { user } = useUser();

    // make call api post bithday /api/user POST
    const changeBirthday = (bitrhdate: string) => {
        if (!token?.access_token) {
            console.error('Access token not found in sessionStorage');
            return;
        }

        const url = `/api/user?access_token=${encodeURIComponent(token.access_token)}`;
        const data = {
            birthdate: bitrhdate
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch
                console.error('Error fetching data:', error);
            });
    }

    const ServiceCard: FC<{ service: Service }> = ({ service }) => (
        <div className="p-4 m-2 bg-gray-500 rounded-lg text-gray-100">
            <h4 className="text-lg font-semibold">{service.name}</h4>
            <div className="flex items-center">
                {service.status === "SERVICE_REG_UNREGISTERED" ? (
                    <HiXCircle className="h-5 w-5 text-red-500" />
                ) : (
                    <HiCheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span className="ml-2">{service.status}</span>
            </div>
        </div>
    );

    if (!user) return <div>Loading...</div>;

    return (
        <div className='flex flex-wrap -mx-3 -mb-3 md:mb-0'>
            <div className='w-full px-3 mb-3 md:mb-0'>
                <section className='py-3'>
                    <div className='container px-4 mx-auto'>
                        <div className='pt-6 pb-8 bg-gray-500 rounded-xl text-gray-100'>
                            <div className='px-6'>
                                <div className="flex items-center mb-4">
                                    <HiUser className="h-5 w-5 text-gray-300 mr-2" />
                                    <h1 className="text-lg font-semibold">
                                        {user.firstName} {user.lastName}
                                    </h1>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-600 rounded-lg">
                                        <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
                                        <p className="flex items-center mb-1">
                                            <HiOutlineMail className="h-5 w-5 text-gray-300 mr-2" />
                                            {user.profiles[0].email}
                                        </p>
                                        <p className="flex items-center mb-1">
                                            <HiOutlinePhone className="h-5 w-5 text-gray-300 mr-2" />
                                            {user.profiles[0].phoneNumber || "Not Provided"}
                                        </p>
                                        <p className="flex items-center">
                                            <HiOutlineOfficeBuilding className="h-5 w-5 text-gray-300 mr-2" />
                                            {user.address.locality || "Not Provided"}
                                        </p>
                                        {/*bitdate*/}
                                        <p className="flex items-center">
                                            <HiCake className="h-5 w-5 text-gray-300 mr-2" />
                                            {user.birthDate || "Not Provided"}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-600 rounded-lg">
                                        <h2 className="text-lg font-semibold mb-2">User Information</h2>
                                        <p className="mb-1">Marketing Consent: {user.marketingConsent ? "Yes" : "No"}</p>
                                        <p className="mb-1">Data Privacy Consent: {user.dataPrivacyConsent ? "Yes" : "No"}</p>
                                        <p className="mb-1">Profiling Consent: {user.profilingConsent ? "Yes" : "No"}</p>
                                    </div>
                                    <div className="col-span-2 p-4 bg-gray-600 rounded-lg">
                                        <h2 className="text-lg font-semibold mb-2">Services</h2>
                                        <div className="flex flex-wrap">
                                            {user.profiles.map((profile) => profile.entity.services?.map((service, i) => (
                                                <div key={i}>
                                                    <ServiceCard service={service} />
                                                </div>
                                            )))}
                                        </div>
                                    </div>
                                    <div className="col-span-2 p-4 bg-gray-600 rounded-lg">
                                        <h2 className="text-lg font-semibold mb-2">Change BirthDate</h2>
                                        <div className="flex flex-wrap">
                                            <div className="p-4 m-2 bg-gray-500 rounded-lg text-gray-100" onClick={() => changeBirthday('1940-01-01T00:00:00.000Z')}>
                                                <h4 className="text-lg font-semibold">Senior</h4>
                                                <div className="flex items-center">
                                                    <HiArrowSmallUp className="h-5 w-5 text-red-500" />
                                                    <span className="ml-2">Senior</span>
                                                </div>
                                            </div>
                                            <div className="p-4 m-2 bg-gray-500 rounded-lg text-gray-100" onClick={() => changeBirthday('1990-01-01T00:00:00.000Z')}>
                                                <h4 className="text-lg font-semibold">Major</h4>
                                                <div className="flex items-center">
                                                    <HiArrowSmallRight className="h-5 w-5 text-white-500" />
                                                    <span className="ml-2">Major</span>
                                                </div>
                                            </div>
                                            <div className="p-4 m-2 bg-gray-500 rounded-lg text-gray-100" onClick={() => changeBirthday('2001-01-01T00:00:00.000Z')}>
                                                <h4 className="text-lg font-semibold">Student</h4>
                                                <div className="flex items-center">
                                                    <HiArrowSmallDown className="h-5 w-5 text-green-500" />
                                                    <span className="ml-2">Student</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
