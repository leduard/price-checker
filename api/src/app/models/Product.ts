import {
    IsDate,
    IsNotEmpty,
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
    OneToMany,
} from "typeorm";

import Shop from "./Shop";
import ProductHistory from "./ProductHistory";

@Entity()
export default class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @Column()
    @IsString()
    @Length(1, 255)
    name: string;

    @ManyToOne(() => Shop, (shop) => shop.products, {
        onDelete: "CASCADE",
        nullable: false,
    })
    @IsNotEmpty()
    @IsUUID()
    shop: Shop;

    @OneToMany(() => ProductHistory, (history) => history.product)
    history: ProductHistory[];

    @CreateDateColumn({ type: "timestamp with time zone" })
    @IsDate()
    @IsOptional()
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    @IsDate()
    @IsOptional()
    updated_at: Date;
}
