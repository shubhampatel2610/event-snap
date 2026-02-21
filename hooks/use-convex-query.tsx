/* eslint-disable @typescript-eslint/no-explicit-any */
import { setData, setError, setLoading } from "@/app/store/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useMutation, useQuery } from "convex/react";
import { useEffect } from "react";
import { toast } from "sonner";

export const useConvexQuery = (query: any, ...args: any) => {
    const dispatch = useAppDispatch();
    const response = useQuery(query, ...args);

    const isLoading = useAppSelector((state) => state.dashboard.isLoading);
    const data = useAppSelector((state) => state.dashboard.data);
    const error = useAppSelector((state) => state.dashboard.error);

    useEffect(() => {
        if (!response) {
            dispatch(setLoading(true));
        } else {
            try {
                dispatch(setData(response));
            } catch (error: any) {
                dispatch(setError(error.message));
                toast.error(error.message);
            } finally {
                dispatch(setLoading(false));
            }
        }
    }, [response, dispatch]);

    return {
        isLoading,
        data,
        error
    }
}

export const useConvexMutations = (mutation: any) => {
    const dispatch = useAppDispatch();
    const mutationFn = useMutation(mutation);

    const isLoading = useAppSelector((state) => state.dashboard.isLoading);
    const data = useAppSelector((state) => state.dashboard.data);
    const error = useAppSelector((state) => state.dashboard.error);

    const mutateData = async (...args: any) => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const response = await mutationFn(...args);
            dispatch(setData(response));
        } catch (error: any) {
            dispatch(setError(error.message));
            toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        mutateData,
        isLoading,
        data,
        error
    }
}