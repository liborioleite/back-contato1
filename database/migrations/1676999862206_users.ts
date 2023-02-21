import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email')
      table.string('password')
      table.string('username')
      table.string('first_name')
      table.string('last_name')
      table.string('sex')
      table.string('city')
      table.boolean('is_valid')
      table.boolean('is_actived')
      table.integer('age')
      table.enum('type', ['user', 'admin'])
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
