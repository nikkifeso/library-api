import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "src/users/entity/user.entity";

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

    @ManyToOne(type => UserEntity)
    owner: UserEntity;

    
}
