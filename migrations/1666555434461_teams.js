/* eslint-disable no-undef */

exports.up = (pgm) => {
  pgm.createTable('Teams', {
    Team_id: { type: 'integer', notNull: true, primaryKey: true },
    Player_1_id: { type: 'integer', notNull: true },
    Player_2_id: { type: 'integer', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
}
