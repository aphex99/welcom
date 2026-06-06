import * as axios from "axios";

import {
    responseErrorHandler,
    responseHandler,
} from "@/shared/api/responseHandlers";
import { URL } from "@/shared/config/consts";

export const api = axios.create({
    baseURL: URL,
    timeout: 5000,
});

api.interceptors.response.use(responseHandler, responseErrorHandler);
