import { Book } from "src/book/book.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Cart{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    userId: number;

    @ManyToOne(() => Book)
    @JoinColumn({name: 'boodId'})
    book: Book;

}