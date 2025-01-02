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
import { Admin } from './admin.model';

// Relations

@Table({
  tableName: 'provinces',
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

  @ForeignKey(() => Admin)
  @Column({
    type: Sequelize.BIGINT,
    allowNull: false,
    references: { model: 'admins', key: 'id' },
  })
  adminId: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  province: string;

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

  @HasMany(() => City, 'provinceId')
  cities: City[];

  @BelongsTo(() => Admin, 'adminId')
  admin: Admin;
}
