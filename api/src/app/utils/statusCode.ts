type StatusCodeDefinition = {
    name: string;
    code: number;
    defaultResponse: {
        status: number;
        message: string;
    };
};

type Status =
    | "BAD_REQUEST"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "INTERNAL_SERVER_ERROR";

const statusCodes: { [key in Status]: StatusCodeDefinition } = {
    BAD_REQUEST: {
        name: "BAD REQUEST",
        code: 400,
        defaultResponse: {
            status: 400,
            message: "Bad Request",
        },
    },
    UNAUTHORIZED: {
        name: "UNAUTHORIZED",
        code: 401,
        defaultResponse: {
            status: 401,
            message: "Unauthorized request detected",
        },
    },
    FORBIDDEN: {
        name: "FORBIDDEN",
        code: 403,
        defaultResponse: {
            status: 403,
            message: "Forbidden",
        },
    },
    NOT_FOUND: {
        name: "NOT FOUND",
        code: 404,
        defaultResponse: {
            status: 404,
            message: "Not Found",
        },
    },
    INTERNAL_SERVER_ERROR: {
        name: "INTERNAL SERVER ERROR",
        code: 500,
        defaultResponse: {
            status: 500,
            message: "Internal Server Error",
        },
    },
};

export const {
    BAD_REQUEST,
    FORBIDDEN,
    UNAUTHORIZED,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
} = statusCodes;
