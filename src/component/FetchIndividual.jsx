import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { individualPost } from '../API/api';

const FetchIndividual = () => {
    const { id } = useParams();

    // Ensure `id` exists before making a request
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => individualPost(id),
        enabled: !!id, // Prevents query from running if `id` is undefined
    });

    console.log("Fetched Data:", data);

    return (
        <div>
            <h2>Hello {id}</h2>

            {isLoading && <p>Loading post...</p>}
            {isError && <p>Error: {error.message || "Something went wrong!"}</p>}

            {data && (
                <ul>
                    <li><strong>Id:</strong> {data?.id}</li>
                    <li><strong>Title:</strong> {data?.title}</li>
                    <li><strong>Body:</strong> {data?.body}</li>
                    
                    <NavLink to="/"><button>Go back</button></NavLink>
                </ul>
            )}
        </div>
    );
};

export default FetchIndividual;
