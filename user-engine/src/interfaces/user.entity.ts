import { BaseEntity, BeforeInsert, Column, Entity, Exclusion, PrimaryGeneratedColumn, Unique } from "typeorm";
import { hash } from "bcrypt";

@Entity()
@Unique(['phone'])
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE';

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}