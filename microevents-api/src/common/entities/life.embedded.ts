import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@ObjectType()
export class Life {
  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field({ nullable: true })
  updateAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  deactivatedAt?: Date;
}
