import { Request, Response, NextFunction } from "express";

import ShopRepository from "@repositories/ShopRepository";
import AppError from "@errors/appError";
import Validator from "@utils/validator";
import {
    PaginationResponseObject,
    ResponseObject,
} from "@utils/ResponseBuilder";
import Shop from "@models/Shop";

export default class ShopController {
    static async create(
        req: Request,
        res: Response,
        _: NextFunction
    ): Promise<void> {
        const body = req.body;
        const shopEntity = ShopRepository.create(body);
        let errors = undefined;

        if (Array.isArray(shopEntity)) {
            for (const entity of shopEntity) {
                errors = await Validator.validate(entity);
                if (errors?.object) break;
            }
        } else {
            errors = await Validator.validate(shopEntity);
        }

        if (errors) {
            throw new AppError("Validation failed.", 400, errors);
        }

        const savedShops = await ShopRepository.save(shopEntity);
        const response = new ResponseObject(savedShops);

        res.status(201).json(response.buildResponse());
    }

    static async all(
        req: Request,
        res: Response,
        _: NextFunction
    ): Promise<void> {
        const { page } = req.query as Record<string, string>;
        const [shops, itemsCount] = await ShopRepository.all({
            page: page,
        });
        const response = new PaginationResponseObject(shops, itemsCount, page);

        res.status(200).json(response.buildResponse());
    }

    static async byHostname(
        req: Request,
        res: Response,
        _: NextFunction
    ): Promise<void> {
        const { hostname } = req.params;
        const shop = await ShopRepository.findByHostname(hostname);

        const response = new ResponseObject(shop);

        res.status(200).json(response.buildResponse());
    }

    static async updateByHostname(
        req: Request,
        res: Response,
        _: NextFunction
    ): Promise<void> {
        const { hostname } = req.params;
        const shop = await ShopRepository.findByHostname(hostname);

        if (!shop?.id) {
            throw new AppError("Shop not found.", 404);
        }

        const body: Partial<Shop> = req.body;

        if (Array.isArray(body)) {
            throw new AppError("Body cannot be an Array.", 400);
        } else if (!Object.keys(body).length) {
            throw new AppError("Update object cannot be empty.", 400);
        }

        delete body.id;
        delete body.created_at;
        delete body.updated_at;
        delete body.hostname;

        const shopEntity = ShopRepository.create({ ...shop, ...body } as Shop);
        const errors = await Validator.validate(shopEntity);

        if (errors) {
            throw new AppError("Validation failed.", 400, errors);
        }

        const updatedShop = await ShopRepository.save(shopEntity);

        const response = new ResponseObject(updatedShop);

        res.status(200).json(response.buildResponse());
    }
}
