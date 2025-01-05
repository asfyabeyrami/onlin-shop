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

  @Column({
    allowNull: true,
    type: Sequelize.STRING,
  })
  brandName: string;

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

  @HasMany(() => Product, 'brandId')
  Product: Product[];

  @BelongsTo(() => Admin, 'adminId')
  Admin: Admin;
}
