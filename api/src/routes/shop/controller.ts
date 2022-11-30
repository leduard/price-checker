import { Request, Response, NextFunction } from "express";

import ShopRepository from "@repositories/ShopRepository";
import AppError from "@errors/appError";
import Validator from "@utils/validator";

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
        res.status(201).json(savedShops);
    }

    static async all(
        req: Request,
        res: Response,
        _: NextFunction
    ): Promise<void> {
        const { offset } = req.query;
        const shops = await ShopRepository.all({
            offset: offset as string,
        });

        res.status(200).json(shops);
    }

    static async byHostname(
        req: Request,
        res: Response,
        _: NextFunction
    ): Promise<void> {
        const { hostname } = req.params;
        const shop = await ShopRepository.findByHostname(hostname);

        res.status(200).json(shop);
    }
}
