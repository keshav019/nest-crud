import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    firstname: string;

    @Column({
        nullable: false,
        default: '',
    })
    lastname: string;

    @Column({
        nullable: false,
        unique:true,
        default: '',
    })
    email: string;

    @Column({
        nullable: false,
        default: '',
    })
    password: string;
}