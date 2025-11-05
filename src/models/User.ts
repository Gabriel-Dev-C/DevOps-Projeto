import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Reservation } from './Reservation'

export type UserRole = 'admin' | 'professor' | 'aluno'

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string

  @Column
  name!: string

  @Column({ unique: true })
  email!: string

  @Column
  passwordHash!: string

  @Column({ defaultValue: 'aluno' })
  role!: UserRole

  @HasMany(() => Reservation)
  reservations!: Reservation[]
}
