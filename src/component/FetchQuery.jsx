import React, { useState } from 'react'
import { fetchPost } from '../API/api'
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchQuery = () => {

    const getData = async () => {
        try {
            let newData = await fetchPost();
            return newData.status == 200 ? newData.data : []
        } catch (error) {
            console.log(error)
            return []
        }

    }

    const { data, error, isLoading } = useQuery({
        queryKey: ["posts"], // useState
        queryFn: getData,    // useEffect 
        // gcTime: 1000,
        // staleTime:70000
        refetchInterval: 1000,
        refetchIntervalInBackground: true
    });

    if (isLoading) return <p>Loading .....</p>
    if (error) return <p>Something went wrong .....</p>

    return (
        <div>
            <h2>Fetch New Method</h2>
            <ul>
                {data && data.map((element) => (
                    <li key={element.id}>
                        <NavLink to={`/new/${element.id}`}>
                        <li><strong>Id:</strong> {element.id}</li>
                        <li><strong>Title:</strong> {element.title}</li>
                        <li><strong>Body:</strong> {element.body}</li>
                        </NavLink>

                        
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default FetchQuery
