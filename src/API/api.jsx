import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const fetchPost = async (pageNumber) => {
    return await api.get(`/posts?_start=${pageNumber}&_limit=3`)
}

export const individualPost = async (id) => {
    try {
        const newData = await api.get(`/posts/${id}`);
        console.log("Fetched Data:", newData);
        return newData.status === 200 ? newData.data : null;
    } catch (error) {
        console.error("Error fetching post:", error?.response || error.message);
        return { error: "Failed to fetch post" };
    }
};
