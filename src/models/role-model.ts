import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user-model.js";

@Table({
  tableName: "roles",
  timestamps: false,
})
export class Role extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: uuidv4(),
  })
  id!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @HasMany(() => User)
  posts!: User[];
}
