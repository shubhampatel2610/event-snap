/* eslint-disable @typescript-eslint/no-explicit-any */
import { setData, setError, setLoading } from "@/app/store/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useConvexQuery = (query: any, args?: any) => {
    const result = useQuery(query, args);
    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (result === undefined) {
            setIsLoading(true);
        } else {
            try {
                setData(result);
                setError(null);
            } catch (err: any) {
                setError(err);
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        }
    }, [result]);

    return {
        data,
        error,
        isLoading,
    };
};

export const useConvexMutations = (mutation: any) => {
    const mutationFn = useMutation(mutation);
    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const mutateData = async (...args: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await mutationFn(...args);
            setData(response);
            return response;
        } catch (err: any) {
            setError(err);
            toast.error(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        mutateData,
        isLoading,
        data,
        error
    };
};