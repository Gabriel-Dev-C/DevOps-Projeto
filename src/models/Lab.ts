import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Reservation } from './Reservation'

@Table({ tableName: 'labs' })
export class Lab extends Model {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string

  @Column
  name!: string

  @Column({ type: DataType.INTEGER, defaultValue: 20 })
  capacity!: number

  @Column({ allowNull: true })
  location?: string

  @HasMany(() => Reservation)
  reservations!: Reservation[]
}
