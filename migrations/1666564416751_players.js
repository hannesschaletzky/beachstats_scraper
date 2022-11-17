/* eslint-disable no-undef */

exports.up = (pgm) => {
  pgm.createTable('Players', {
    DVV_ID: { type: 'integer', primaryKey: true },
    First_Name: { type: 'varchar(100)', notNull: true },
    Last_Name: { type: 'varchar(100)', notNull: true },
    Club: { type: 'varchar(100)' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
}
