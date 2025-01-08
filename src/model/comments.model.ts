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
import { Province } from './provinces.model';
import { Address } from './addresses.model';
import { Product } from './products.model';
import { User } from './users.model';

@Table({
  tableName: 'Comments',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Comment extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.BIGINT,
  })
  id: number;

  @ForeignKey(() => Product)
  @Column({
    type: Sequelize.BIGINT,
    allowNull: false,
    references: { model: 'products', key: 'id' },
  })
  productId: number;

  @ForeignKey(() => User)
  @Column({
    type: Sequelize.BIGINT,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  })
  userId: number;

  @Column({
    allowNull: false,
    type: Sequelize.TEXT,
  })
  comment: string;

  @Column({
    allowNull: false,
    type: Sequelize.BOOLEAN,
  })
  isPublish: boolean;

  @Column({
    defaultValue: new Date(),
    allowNull: false,
    type: Sequelize.DATE,
  })
  createdAt: Date;

  // Relations

  @BelongsTo(() => Product, 'productId')
  product: Product;

  @BelongsTo(() => User, 'userId')
  user: User;
}
