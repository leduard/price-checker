import { Request, Response, NextFunction } from "express";

import HistoryRepository from "@repositories/HistoryRepository";
import AppError from "@errors/appError";
import Validator from "@utils/validator";
import {
    PaginationResponseObject,
    ResponseObject,
} from "@utils/ResponseBuilder";

export default class HistoryController {
    static async create(
        req: Request,
        res: Response,
        _: NextFunction
    ): Promise<void> {
        const body = req.body;
        const historyEntity = HistoryRepository.create(body);

        if (Array.isArray(historyEntity)) {
            throw new AppError("Cannot create an array of this Entity", 400);
        }

        const errors = await Validator.validate(historyEntity);

        if (errors) {
            throw new AppError("Validation failed.", 400, errors);
        }

        const savedHistory = await HistoryRepository.save(historyEntity);
        const response = new ResponseObject(savedHistory);

        res.status(201).json(response.buildResponse());
    }
}
