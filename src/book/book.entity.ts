import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    book_name: string;

    @Column()
    Author: string;

    @Column() //Image property can be nullable
    image: string;
}