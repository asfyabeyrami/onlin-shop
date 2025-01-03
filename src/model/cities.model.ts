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

@Table({
  tableName: 'cities',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class City extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.BIGINT,
  })
  id: number;

  @ForeignKey(() => Province)
  @Column({
    type: Sequelize.BIGINT,
    allowNull: false,
    references: { model: 'provinces', key: 'id' },
  })
  provinceId: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  city: string;

  // Relations

  @BelongsTo(() => Address, 'cityId')
  Address: Address;

  @BelongsTo(() => Province, 'provinceId')
  province: Province;
}
