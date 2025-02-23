
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    isComplete: boolean;

    @ManyToOne(() => User, (user) => user.tasks, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number; // Required userId column
}

