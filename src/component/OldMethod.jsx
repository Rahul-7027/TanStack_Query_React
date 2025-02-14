import React, { useEffect, useState } from "react";
import { fetchPost } from "../API/api";

const OldMethod = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)

    const getData = async () => {
        try {
            const newData = await fetchPost();
            newData.status === 200 ? setData(newData.data) : setData([])
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(true)
            setError(true)
        }
    };


    useEffect(() => {
        getData();
    }, []);


    if (isLoading) { return <p>Loading ......</p> }
    if (isError) { return <p>Something went wrong .....</p> }
    return (
        <div>

            <h2>Fetch Old Method</h2>
            <ul>
                {Array.isArray(data) && data.map((element) => (
                    <li key={element.id}>
                        <p>{element.title}</p>
                        <p>{element.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OldMethod;
