import React, { useEffect, useState } from "react";
import { fetchPost } from "../API/api";

const OldMethod = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const newData = await fetchPost();
            newData.status === 200 ? setData(newData.data) : setData([])
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    console.log(11111, data)

    useEffect(() => {
        getData();
    }, []);

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
