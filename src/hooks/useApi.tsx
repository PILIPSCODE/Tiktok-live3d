import { useState, useEffect } from "react";

interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    status: number | null;
}

function useApi<T>(endpoint: string) {
    const [response, setResponse] = useState<ApiResponse<T>>({ data: null, error: null, status: null });

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    const fetchData = async () => {
        try {
            const res = await fetch(endpoint);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch");
            setResponse({ data, error: null, status: res.status });
        } catch (error: any) {
            setResponse({ data: null, error: error.message, status: null });
        }
    };

    const postData = async (payload: T) => {
        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to post");
            setResponse({ data, error: null, status: res.status });
        } catch (error: any) {
            setResponse({ data: null, error: error.message, status: null });
        }
    };

    const putData = async (payload: T) => {
        try {
            const res = await fetch(endpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to update");
            setResponse({ data, error: null, status: res.status });
        } catch (error: any) {
            setResponse({ data: null, error: error.message, status: null });
        }
    };

    const deleteData = async () => {
        try {
            const res = await fetch(endpoint, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            setResponse({ data: null, error: null, status: res.status });
        } catch (error: any) {
            setResponse({ data: null, error: error.message, status: null });
        }
    };

    return { response, fetchData, postData, putData, deleteData };
}

export default useApi;
