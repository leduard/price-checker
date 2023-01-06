import {
    IsArray,
    IsBoolean,
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    Length,
} from "class-validator";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";

import Product from "./Product";

import CurrencyType from "@utils/types/Currency";

@Entity()
export default class ProductHistory {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Product, (product) => product.history, {
        onDelete: "CASCADE",
        nullable: false,
    })
    @IsNotEmpty()
    @IsUUID()
    product: Product;

    @Column({ type: "enum", enum: CurrencyType })
    @IsEnum(CurrencyType)
    currency: CurrencyType;

    @Column()
    @IsNotEmpty()
    @IsBoolean()
    available: boolean;

    @Column({ type: "numeric" })
    @IsNotEmpty()
    @IsNumber()
    priceInCash: number;

    @Column({ type: "numeric" })
    @IsNotEmpty()
    @IsNumber()
    priceInCredit: number;

    @Column()
    @IsNotEmpty()
    @IsBoolean()
    promo: boolean;

    @Column({ type: "text", array: true, nullable: true })
    @IsOptional()
    @IsArray()
    images: string[];

    @Column()
    @CreateDateColumn({ type: "timestamp with time zone" })
    @IsDate()
    @IsOptional()
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    @IsDate()
    @IsOptional()
    updated_at: Date;
}
