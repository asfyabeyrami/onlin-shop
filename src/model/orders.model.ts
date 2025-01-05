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
import { Basket } from './basket.model';
import { Address } from './addresses.model';
import { Method } from 'src/common/eNums/paymentMethod.enum';
import { Delivery } from 'src/common/eNums/delivery.enum';

@Table({
  tableName: 'orders',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Order extends Model {
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

  @ForeignKey(() => Basket)
  @Column({
    type: Sequelize.BIGINT,
    references: { model: 'baskets', key: 'id' },
  })
  basketId: number;

  @ForeignKey(() => Address)
  @Column({
    type: Sequelize.BIGINT,
    references: { model: 'addresses', key: 'id' },
  })
  addressId: number;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  totalPrice: number;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  totalDiscount: number;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  finalPrice: number;

  @Column({
    defaultValue: Delivery.POST,
    allowNull: false,
    type: Sequelize.ENUM({ values: Object.keys(Delivery) }),
  })
  delivery: string;

  @Column({
    allowNull: false,
    type: Sequelize.ENUM({ values: Object.keys(Method) }),
  })
  paymentMethod: string;

  @Column({
    defaultValue: false,
    allowNull: false,
    type: Sequelize.BOOLEAN,
  })
  paymentStatus: boolean;

  @Column({
    defaultValue: false,
    allowNull: false,
    type: Sequelize.STRING,
  })
  status: string;

  // Relations

  @BelongsTo(() => User, 'userId')
  User: User;

  @BelongsTo(() => Basket, { foreignKey: 'basketId' })
  Basket: Basket;

  @BelongsTo(() => Address, { foreignKey: 'addressId' })
  Address: Address;
}
