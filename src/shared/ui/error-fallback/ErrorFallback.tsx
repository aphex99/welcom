import type { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error }: FallbackProps) => {
    const errorMessage =
        error instanceof Error
            ? error.message
            : typeof error === "string"
              ? error
              : "Some error occurred";
    return (
        <div
            className={
                "flex flex-col gap-4 justify-center h-screen items-center"
            }
        >
            <h1 className={"text-4xl px-10"}>
                Something went wrong. Thank you, error boundary!
            </h1>
            <div>{errorMessage}</div>
        </div>
    );
};

export default ErrorFallback;
