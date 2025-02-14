import React, { useState } from 'react';
import { fetchPost } from '../API/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchQuery = () => {
    const [pageNumber, setPage] = useState(0);

    const getData = async (pageNumber) => {
        try {
            let newData = await fetchPost(pageNumber); // ✅ Pass pageNumber
            return newData.status === 200 ? newData.data : [];
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ["posts", pageNumber],
        queryFn: () => getData(pageNumber),  // ✅ Fix function call
        placeholderData: keepPreviousData(), // ✅ Correct usage
    });

    if (isLoading) return <p>Loading .....</p>;
    if (error) return <p>Something went wrong .....</p>;

    return (
        <div>
            <h2>Fetch New Method</h2>
            <ul>
                {data &&
                    data.map((element) => (
                        <li key={element.id}>
                            <NavLink to={`/new/${element.id}`}>
                                <strong>Id:</strong> {element.id} <br />
                                <strong>Title:</strong> {element.title} <br />
                                <strong>Body:</strong> {element.body}
                            </NavLink>
                        </li>
                    ))}
            </ul>
            <div className="btn" style={{ backgroundColor: "red" }}>
                <button type="button" disabled={pageNumber === 0} onClick={() => setPage((prev) => prev - 3)}>
                    Prev
                </button>
                <br />
                <br />
                {(pageNumber / 3) + 1}
                <button type="button" onClick={() => setPage((prev) => prev + 3)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default FetchQuery;
