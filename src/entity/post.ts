import { Column, Entity, RelationId, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import Category from './category';
import User from './user';

@Entity('post')
export default class Post {
    @PrimaryGeneratedColumn()
    idx!: number;

    @RelationId((post: Post) => post.user)
    userEmail!: string;

    @ManyToOne(type => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_email' })
    user!: User;

    // @RelationId((post: Post) => post.category)
    // categoryIdx!: string;

    // @ManyToOne(type => Category)
    // @JoinColumn({ name: 'category_id' })
    // category!: Category;

    @Column({
        type: 'varchar'
    })
    title!: string;

    @Column({
        type: 'varchar'
    })
    content!: string;
    
    @Column({
        type: 'varchar',
        nullable: true
    })
    image?: string | undefined;

    @Column({
        type: 'datetime'
    })
    createdAt: Date = new Date();    
}