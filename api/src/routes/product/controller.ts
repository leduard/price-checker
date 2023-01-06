import { Request, Response, NextFunction } from "express";

import ProductRepository from "@repositories/ProductRepository";
import AppError from "@errors/appError";
import Validator from "@utils/validator";
import {
    PaginationResponseObject,
    ResponseObject,
} from "@utils/ResponseBuilder";

export default class ProductController {
    static async create(
        req: Request,
        res: Response,
        _: NextFunction
    ): Promise<void> {
        const body = req.body;
        const productEntity = ProductRepository.create(body);
        let errors = undefined;

        if (Array.isArray(productEntity)) {
            for (const entity of productEntity) {
                errors = await Validator.validate(entity);
                if (errors?.object) break;
            }
        } else {
            errors = await Validator.validate(productEntity);
        }

        if (errors) {
            throw new AppError("Validation failed.", 400, errors);
        }

        try {
            const savedProducts = await ProductRepository.save(productEntity);
            const response = new ResponseObject(savedProducts);
            res.status(201).json(response.buildResponse());
        } catch (err: any) {
            if (err?.message?.includes("duplicate")) {
                throw new AppError("Product already exists.", 409, [
                    { hint: err?.detail },
                ]);
            }

            throw err;
        }
    }

    static async all(
        req: Request,
        res: Response,
        _: NextFunction
    ): Promise<void> {
        const { page } = req.query as Record<string, string>;
        const [products, itemsCount] = await ProductRepository.all({
            page: page,
        });
        const response = new PaginationResponseObject(
            products,
            itemsCount,
            page
        );

        res.status(200).json(response.buildResponse());
    }

    static async byHostname(
        req: Request,
        res: Response,
        _: NextFunction
    ): Promise<void> {
        const { page } = req.query as Record<string, string>;
        const { hostname } = req.params;
        const [products, itemsCount] = await ProductRepository.findByHostname({
            page,
            hostname,
        });

        const response = new PaginationResponseObject(
            products,
            itemsCount,
            page
        );

        res.status(200).json(response.buildResponse());
    }
}
