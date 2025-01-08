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
import { Comment } from './comments.model';

@Table({
  tableName: 'products',
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
    references: { model: 'categories', key: 'id' },
  })
  categoryId: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  productName: string;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  pCode: number;

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

  @HasMany(() => BasketProduct, 'productId')
  basketProducts: BasketProduct[];

  @HasMany(() => Comment, 'productId')
  comment: Comment[];

  @BelongsTo(() => Admin, 'adminId')
  admin: Admin;

  @BelongsTo(() => Brand, 'brandId')
  brand: Brand;

  @BelongsTo(() => Category, 'categoryId')
  category: Category;
}
