import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "@tanstack/react-query";

import ThemeSync from "@/app/providers/theme/ThemeSync";

import { queryClient } from "@/shared/api/client";
import ErrorFallback from "@/shared/ui/error-fallback/ErrorFallback";

interface AppProviderI {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProviderI) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeSync>{children}</ThemeSync>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default AppProviders;
