/* eslint-disable no-undef */

exports.up = (pgm) => {
  pgm.createTable('Participations', {
    Team_id: { type: 'integer', notNull: true, primaryKey: true },
    Tournament_id: { type: 'integer', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  pgm.addConstraint('Participations', 'ForeignKey', {
    foreignKeys: { columns: 'Team_id', references: 'Teams' }
  })
}
