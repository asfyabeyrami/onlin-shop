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
import { City } from './cities.model';

// Relations

@Table({
  tableName: 'Provinces',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Province extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.BIGINT,
  })
  id: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  province: string;

  // Relations

  @HasMany(() => City, 'provinceId')
  City: City[];
}
