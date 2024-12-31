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
import { Admin } from './admin.model';
import { Category } from './categories.model';
import { Brand } from './brands.model';
import { BasketProduct } from './basketProduct.model';

@Table({
  tableName: 'Products',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Product extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.BIGINT,
  })
  id: number;

  @ForeignKey(() => Admin)
  @Column({
    type: Sequelize.BIGINT,
    references: { model: 'admins', key: 'id' },
  })
  adminId: number;

  @ForeignKey(() => Brand)
  @Column({
    type: Sequelize.BIGINT,
    references: { model: 'brands', key: 'id' },
  })
  brandId: number;

  @ForeignKey(() => Category)
  @Column({
    type: Sequelize.BIGINT,
    references: { model: 'Categories', key: 'id' },
  })
  categoryId: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  productName: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  pCode: string;

  @Column({
    allowNull: false,
    type: Sequelize.BOOLEAN,
  })
  isAvailable: boolean;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  count: number;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  price: number;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  discount: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  picUrl: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  description: string;

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

  @BelongsTo(() => BasketProduct, 'productId')
  BasketProduct: BasketProduct;

  @BelongsTo(() => Admin, 'adminId')
  Admin: Admin;

  @BelongsTo(() => Brand, 'brandId')
  Brand: Brand;

  @BelongsTo(() => Category, 'categoryId')
  Category: Category;
}
