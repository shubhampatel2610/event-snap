import { useUser } from "@clerk/clerk-react";
import { useConvexAuth, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { usePathname, useRouter } from "next/navigation";
import { AppConstants } from "@/app/constants/AppConstants";

export function useStoreUser() {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const { user } = useUser();
    const router = useRouter();
    const pathname = usePathname();
    // When this state is set we know the server
    // has stored the user.
    const [userId, setUserId] = useState<Id<"users"> | null>(null);
    const storeUser = useMutation(api.users.store);
    const currentUserData = useQuery(
        api.users.getCurrentUserData,
        isAuthenticated ? {} : "skip"
    );
    // Call the `storeUser` mutation function to store
    // the current user in the `users` table and return the `Id` value.
    useEffect(() => {
        // If the user is not logged in don't do anything
        if (!isAuthenticated) {
            return;
        }
        // Store the user in the database.
        // Recall that `storeUser` gets the user information via the `auth`
        // object on the server. You don't need to pass anything manually here.
        async function createUser() {
            const id = await storeUser();
            setUserId(id);
        }
        createUser();
        return () => setUserId(null);
        // Make sure the effect reruns if the user logs in with
        // a different identity
    }, [isAuthenticated, storeUser, user?.id]);

    // Once the user record has been created (or should already exist) and is
    // still missing from Convex, send the user to sign up instead of letting
    // downstream queries throw "User Not Found".
    useEffect(() => {
        if (
            isAuthenticated &&
            userId !== null &&
            currentUserData === null &&
            pathname !== AppConstants.SIGN_UP_ROUTE
        ) {
            router.push(AppConstants.SIGN_UP_ROUTE);
        }
    }, [isAuthenticated, userId, currentUserData, pathname, router]);

    // Combine the local state with the state from context
    return {
        isLoading: isLoading || (isAuthenticated && userId === null),
        isAuthenticated: isAuthenticated && userId !== null,
    };
}