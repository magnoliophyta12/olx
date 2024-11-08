import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Category } from "./category-model.js";
import { User } from "./user-model.js";
import { Photo } from "./photo-model.js";

@Table({
  tableName: "ads",
  timestamps: false,
})
export class Ad extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: uuidv4(),
  })
  id!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isActive!: string;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  categoryId!: string;

  @BelongsTo(() => Category)
  category!: Category;

  @BelongsTo(() => User)
  user!: User;
  
  @HasMany(() => Photo)
  posts!: Photo[];

}
