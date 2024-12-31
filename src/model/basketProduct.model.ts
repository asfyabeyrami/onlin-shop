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
import { Product } from './products.model';
import { Basket } from './basket.model';

@Table({
  tableName: 'BasketProducts',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class BasketProduct extends Model {
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
    references: { model: 'products', key: 'id' },
  })
  productId: number;

  @ForeignKey(() => Basket)
  @Column({
    type: Sequelize.BIGINT,
    references: { model: 'baskets', key: 'id' },
  })
  basketId: number;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  count: number;

  // Relations

  @HasMany(() => Product, 'productId')
  Product: Product[];

  @HasMany(() => Basket, 'basketId')
  Basket: Basket[];
}
