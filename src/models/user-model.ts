import {
    Model,
    Table,
    Column,
    DataType,
    HasMany,
    HasOne,
    Default,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import {v4 as uuidv4} from "uuid";
import { Role } from "./role-model.js";
import { Ad } from "./ad-model.js";
import { Message } from "./message-model.js";
import Token from "./token-model.js";
  
  
  @Table({
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  })
  export class User extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue:uuidv4(),
    })
    id!: string;
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    login!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      password!: string;


    @ForeignKey(()=>Role)
    @Column({
        type:DataType.UUID
    })
    roleId!:string;
    
    @Default(DataType.NOW)
    @Column({
      type: DataType.DATE,
    })
    created_at!: Date;
  
    @Default(DataType.NOW)
    @Column({
      type: DataType.DATE,
    })
    updated_at!: Date;

    @BelongsTo(()=>Role)
    role!:Role;

    @HasMany(() => Ad)
    posts!: Ad[];

    @HasMany(() => Message, { foreignKey: 'senderId', as: 'sentMessages' })
    sentMessages!: Message[];
  
    @HasMany(() => Message, { foreignKey: 'receiverId', as: 'receivedMessages' })
    receivedMessages!: Message[];

    @HasOne(() => Token)
    token!: Token;
  
  }
  