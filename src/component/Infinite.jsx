import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { infiniteData } from '../API/api'

const Infinite = () => {

    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["users"],
        queryFn: infiniteData,
        getNextPageParam: (lastPage) => 
            lastPage?.nextCursor ?? undefined, // Fixed the pagination check
    });

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 50 // Adjusted scroll detection
        ) {
            if (hasNextPage) {
                fetchNextPage();
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPage]); // Ensure useEffect updates when pagination changes

    console.log("Fetched Data:", data);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <h2>Infinite Scroll</h2>
            {data?.pages.map((page, i) => (
                <div key={i}>
                    {page && page.map((user) => (
                        <p key={user.id}>
                            <img src={user.avatar_url} alt="Avtar"/>
                        </p>
                    ))}
                </div>
            ))}

        </div>
    )
}

export default Infinite
