'use client';

import { useState, useEffect, FC } from "react";
import { HiOutlineMail, HiOutlinePhone, HiUser, HiOutlineOfficeBuilding, HiCheckCircle, HiXCircle } from "react-icons/hi";
import {Service} from "@/vulog/users";
import {useUser} from "@components/context/UserProvider";

export default function Profile() {
    const { user } = useUser();

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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
