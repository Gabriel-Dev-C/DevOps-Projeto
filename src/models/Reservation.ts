import { Table, Column, Model, DataType, ForeignKey, BelongsTo, CreatedAt } from 'sequelize-typescript'
import { User } from './User'
import { Lab } from './Lab'

@Table({ tableName: 'reservations' })
export class Reservation extends Model {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId!: string

  @ForeignKey(() => Lab)
  @Column({ type: DataType.UUID })
  labId!: string

  @BelongsTo(() => User)
  user!: User

  @BelongsTo(() => Lab)
  lab!: Lab

  @Column({ type: DataType.DATE })
  startAt!: Date

  @Column({ type: DataType.DATE })
  endAt!: Date

  @Column({ defaultValue: 'pending' })
  status!: string

  @CreatedAt
  createdAt!: Date
}
