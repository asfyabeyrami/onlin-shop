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
import { Category } from './categories.model';
import { CatBrand } from './catBrand.model';
import { Product } from './products.model';
import { Admin } from './admin.model';

@Table({
  tableName: 'brands',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Brand extends Model {
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

  @ForeignKey(() => Category)
  @Column({
    type: Sequelize.BIGINT,
    references: { model: 'categories', key: 'id' },
  })
  categoryId: number;

  @Column({
    allowNull: true,
    type: Sequelize.STRING,
  })
  brandName: string;

  @ForeignKey(() => Category)
  @Column({
    allowNull: true,
    type: Sequelize.INTEGER,
  })
  fatherId: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  picUrl: string;

  @Column({
    allowNull: true,
    type: Sequelize.TEXT,
  })
  description: string;

  // Relations

  @BelongsTo(() => Brand, 'fatherId')
  parent: Brand;

  @HasMany(() => Brand, 'fatherId')
  children: Brand[];

  @BelongsToMany(() => Category, () => CatBrand)
  Category: Category[];

  @HasMany(() => Product, 'brandId')
  Product: Product[];

  @BelongsTo(() => Admin, 'adminId')
  Admin: Admin;
}
