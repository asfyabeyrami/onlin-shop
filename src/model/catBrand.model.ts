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
import { Brand } from './brands.model';
import { Category } from './categories.model';

@Table({
  tableName: 'catBrand',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class CatBrand extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.BIGINT,
  })
  id: number;

  // Relations

  @ForeignKey(() => Brand)
  @Column
  brandId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;
}
