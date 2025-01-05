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
import { Product } from './products.model';
import { Category } from './categories.model';
import { Brand } from './brands.model';
import { Province } from './provinces.model';

@Table({
  tableName: 'admins',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Admin extends Model {
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
    unique: true,
  })
  userName: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  password: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  role: string;

  @Column({
    type: Sequelize.TEXT,
    allowNull: true,
  })
  jwtToken: string;

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
  @HasMany(() => Product, 'adminId')
  Product: Product[];

  @HasMany(() => Brand, 'adminId')
  Brand: Brand[];

  @HasMany(() => Category, 'adminId')
  Category: Category[];

  @HasMany(() => Province, 'adminId')
  province: Province[];
}
