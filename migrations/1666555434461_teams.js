/* eslint-disable no-undef */

exports.up = (pgm) => {
  pgm.createTable('Teams', {
    DVV_ID: { primaryKey: true, type: 'integer', notNull: true },
    Player_1_DVV_ID: { type: 'integer', notNull: true },
    Player_2_DVV_ID: { type: 'integer', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
}
