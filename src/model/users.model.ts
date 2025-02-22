import {
  Column,
  Table,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { Order } from './orders.model';
import { Basket } from './basket.model';
import { Address } from './addresses.model';
import { Comment } from './comments.model';

@Table({
  tableName: 'users',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.BIGINT,
  })
  id: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  lastName: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  role: string;

  @Column({
    allowNull: false,
    type: Sequelize.BIGINT,
    unique: true,
  })
  mobile: number;

  @Column({
    allowNull: false,
    type: Sequelize.BOOLEAN,
  })
  isActive: boolean;

  @Column({
    type: Sequelize.TEXT,
    allowNull: true,
  })
  jwtToken: string;

  @Column({
    defaultValue: new Date(),
    allowNull: false,
    type: Sequelize.DATE,
  })
  createdAt: Date;

  @Column({
    defaultValue: new Date(),
    allowNull: false,
    type: Sequelize.DATE,
  })
  updatedAt: Date;

  // Relations

  @HasMany(() => Order, 'userId')
  order: Order[];

  @HasMany(() => Basket, 'userId')
  basket: Basket[];

  @HasMany(() => Address, 'userId')
  address: Address[];

  @HasMany(() => Comment, 'userId')
  comment: Comment[];
}
