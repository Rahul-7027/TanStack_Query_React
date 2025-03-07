import React, { useState } from 'react';
import { fetchPost, updatePost } from '../API/api';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router-dom';
import { deletePost } from '../API/api';
const FetchQuery = () => {

    const queryClient = useQueryClient()

    const [pageNumber, setPage] = useState(0);

    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (id) => {
            console.log("Post deleted successfully!");

            queryClient.setQueryData(["posts", pageNumber], (currElem) => {
                return currElem.filter((post) => post.id !== id); // ✅ Correct filtering
            });
        },
        onError: (error) => {
            console.error("Failed to delete post:", error);
        }
    });
    const updateMutation = useMutation({
        mutationFn: (id) => updatePost(id),
        onSuccess: (apiData, id) => {  // ✅ Correct order of parameters
            console.log("Post updated successfully!", apiData);
    
            queryClient.setQueryData(["posts", pageNumber], (postData = []) => {
                return postData.map((post) => 
                    post.id === id ? { ...post, ...apiData } : post  // ✅ Update the post with new data
                );
            });
        },
        onError: (error) => {
            console.error("Failed to update post:", error);
        }
    });
    


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
                            <button onClick={() => deleteMutation.mutate(element.id)} disabled={deleteMutation.isLoading}>
                                {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                            </button>
                            <button onClick={() => updateMutation.mutate(element.id)} >Update
                            </button>

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
