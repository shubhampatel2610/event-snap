/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConvexReactClient } from "convex/react";
import { store } from "./store/store";
import { setLoading, setData, setError } from "./store/dashboardSlice";

// create a single instance for use throughout the app and store
export const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// helper that wraps a query and mirrors result into dashboard slice
export async function queryWithDashboard(query: any, args?: any): Promise<any> {
  // start loading state
  store.dispatch(setLoading(true));
  try {
    const result = args
      ? await convexClient.query(query, args)
      : await convexClient.query(query);
    store.dispatch(setData(result));
    return result;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    store.dispatch(setError(message));
    throw err;
  } finally {
    store.dispatch(setLoading(false));
  }
}

// helper that wraps a mutation and mirrors result into dashboard slice
export async function mutationWithDashboard(mutation: any, arg?: any): Promise<any> {
  store.dispatch(setLoading(true));
  store.dispatch(setError(null));
  try {
    const result = arg !== undefined
      ? await convexClient.mutation(mutation, arg)
      : await convexClient.mutation(mutation);
    store.dispatch(setData(result));
    return result;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    store.dispatch(setError(message));
    throw err;
  } finally {
    store.dispatch(setLoading(false));
  }
}
