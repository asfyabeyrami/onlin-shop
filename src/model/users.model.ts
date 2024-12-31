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
  Name: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  lastName: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  password: string;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
    unique: true,
  })
  mobile: number;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
    unique: true,
  })
  isActive: number;

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
  Order: Order[];

  @HasMany(() => Basket, 'userId')
  Basket: Basket[];

  @HasMany(() => Address, 'userId')
  Address: Address[];
}
