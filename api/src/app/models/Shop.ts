import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Length,
    ValidateNested,
} from "class-validator";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";

import Product from "./Product";

@Entity()
export default class Shop {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsString()
    @Length(1, 50)
    name: string;

    @Column({ unique: true })
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @Column({ unique: true })
    @IsString()
    @IsNotEmpty()
    hostname: string;

    @Column({ nullable: true })
    @IsUrl()
    @IsNotEmpty()
    @IsOptional()
    logo: string;

    @Column({ default: true })
    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @OneToMany(() => Product, (product) => product.shop)
    products: Product[];

    @CreateDateColumn({ type: "timestamp with time zone" })
    @IsDate()
    @IsOptional()
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    @IsDate()
    @IsOptional()
    updated_at: Date;
}
