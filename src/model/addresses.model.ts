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
import { City } from './cities.model';
import { Order } from './orders.model';

@Table({
  tableName: 'addresses',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Address extends Model {
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

  @ForeignKey(() => City)
  @Column({
    type: Sequelize.BIGINT,
    references: { model: 'cities', key: 'id' },
  })
  cityId: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  address: string;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
    unique: true,
  })
  zipCode: number;

  // Relations

  @BelongsTo(() => Order, 'addressId')
  Order: Order;

  @BelongsTo(() => User, 'userId')
  User: User;

  @BelongsTo(() => City, 'cityId')
  City: City;
}
