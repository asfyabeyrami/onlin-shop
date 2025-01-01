import {
  Column,
  Table,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
  HasOne,
  BelongsToMany,
} from 'sequelize-typescript';
import Sequelize from 'sequelize';

// Relations
import { Admin } from './admin.model';
import { Brand } from './brands.model';
import { CatBrand } from './catBrand.model';
import { Product } from './products.model';

@Table({
  tableName: 'categories',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Category extends Model {
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

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  title: string;

  @ForeignKey(() => Category)
  @Column({
    allowNull: true,
    type: Sequelize.INTEGER,
  })
  fatherId: number;

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

  @BelongsTo(() => Category, 'fatherId')
  parent: Category;

  @HasMany(() => Category, 'fatherId')
  children: Category[];

  @BelongsToMany(() => Brand, () => CatBrand)
  brand: Brand[];

  @BelongsTo(() => Admin, 'adminId')
  bdmin: Admin;

  @HasMany(() => Product, 'categoryId')
  product: Product;
}
