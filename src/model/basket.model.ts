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

// Relations
import { User } from './users.model';
import { Order } from './orders.model';
import { BasketProduct } from './basketProduct.model';

@Table({
  tableName: 'baskets',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Basket extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.BIGINT,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: Sequelize.BIGINT,
    references: { model: 'users', key: 'id' },
  })
  userId: number;

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
  @BelongsTo(() => User, 'userId')
  User: User;

  @HasMany(() => BasketProduct, 'basketId')
  BasketProduct: BasketProduct[];

  @HasOne(() => Order, 'basketId')
  order: Order;
}
