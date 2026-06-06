import { toast } from "react-hot-toast";
import * as axios from "axios";
import { type AxiosError, type AxiosResponse } from "axios";

export const responseHandler = (response: AxiosResponse) => {
    if (response.status === 200) {
        if (!response.data) {
            throw new Error("API Error! Doesn't have any data.");
        }
        throw new Error("The server is off");
        // return response;
    }
    throw new Error("API Error! Invalid status code!");
};

export const responseErrorHandler = (response: AxiosError) => {
    errorHandler(response);
};

export const errorHandler = (error: unknown): never => {
    if (error === null) {
        const nullErrorMessage = "Error. No data inside the Error";
        toast.error(nullErrorMessage);
        throw new Error(nullErrorMessage);
    }
    if (axios.isAxiosError(error)) {
        const response = error?.response;
        if (error.code === "ERR_NETWORK") {
            toast.error("connection problems...");
            throw error;
        }
        if (response) {
            const statusCode = response?.status;
            if (statusCode === 404) {
                toast.error(
                    "The requested resource does not exist or has been deleted",
                );
                throw error;
            } else if (statusCode === 401) {
                toast.error("Please login to access this resource");
                throw error;
            } else {
                toast.error(`Some error Axios is occurred: ${error.message}`);
                throw error;
            }
        }
    } else {
        const notAxiosErrorMessage = "Some error occurred but it doesn't Axios";
        toast.error(notAxiosErrorMessage);
        throw error;
    }
    throw new Error("Don't have any explanations for the error");
};
