import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Length,
} from "class-validator";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Shop {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsString()
    @Length(1, 50)
    name: string;

    @Column()
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @Column()
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

    @CreateDateColumn({ type: "timestamp with time zone" })
    @IsDate()
    @IsOptional()
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    @IsDate()
    @IsOptional()
    updated_at: Date;
}
