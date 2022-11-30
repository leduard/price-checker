import { UNAUTHORIZED } from "@utils/statusCode";
import { Request, Response, NextFunction } from "express";

async function basicAuth(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;

    if (!headers["authorization"]) {
        return unauthorized(res);
    }

    const authHeader = headers["authorization"].split(" ");

    if (authHeader[0] !== "Basic" || !authHeader[1]) {
        return unauthorized(res);
    }

    const authString = Buffer.from(authHeader[1], "base64").toString();

    const [user, password] = authString.split(":");

    if (
        user !== process.env.BASIC_AUTH_USER ||
        password !== process.env.BASIC_AUTH_PASS
    ) {
        return unauthorized(res);
    }

    next();
}

const unauthorized = (res: Response) => {
    res.status(UNAUTHORIZED.code).json(UNAUTHORIZED.defaultResponse);
};

export default basicAuth;
