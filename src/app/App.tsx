import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";

import UsersTablePage from "@/pages/users/UsersTablePage";

import { queryClient } from "@/shared/api/client";
import ErrorFallback from "@/shared/ui/error-fallback/ErrorFallback";

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Toaster />
                <UsersTablePage />
            </ErrorBoundary>
        </QueryClientProvider>
    );
};

export default App;
