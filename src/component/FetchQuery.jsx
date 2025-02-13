import React, { useState } from 'react'
import { fetchPost } from '../API/api'
import { useQuery } from '@tanstack/react-query';

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

    });

    if (isLoading) return <p>Loading .....</p>
    if (error) return <p>Something went wrong .....</p>

    console.log(11111, data)
    return (
        <div>
            <h2>Fetch New Method</h2>
            <ul>
                {data && data.map((element) => (
                    <li key={element.id}>
                        <p>{element.title}</p>
                        <p>{element.body}</p>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default FetchQuery
