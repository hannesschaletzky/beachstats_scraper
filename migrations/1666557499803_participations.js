/* eslint-disable no-undef */

exports.up = (pgm) => {
  pgm.createTable('Participations', {
    id: { type: 'serial', primaryKey: true },
    Team_id: { type: 'integer', notNull: true },
    Tournament_id: { type: 'integer', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  pgm.addConstraint('Participations', 'ForeignKey Team_id', {
    foreignKeys: { columns: 'Team_id', references: 'Teams' }
  })

  pgm.addConstraint('Participations', 'Unique Participation', {
    unique: ['Team_id', 'Tournament_id']
  })
}
