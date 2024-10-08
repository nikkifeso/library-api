import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar', length: 30 })
    author: string;

    @Column({ type: 'varchar' })
    year_published: number;

    
}
