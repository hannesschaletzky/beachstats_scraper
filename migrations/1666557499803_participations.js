/* eslint-disable no-undef */

exports.up = (pgm) => {
  pgm.createTable('Participations', {
    ID: { type: 'serial', primaryKey: true },
    Team_DVV_ID: { type: 'integer', notNull: true },
    Tournament_DVV_ID: { type: 'integer', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  pgm.addConstraint('Participations', 'ForeignKey Team_DVV_ID', {
    foreignKeys: { columns: 'Team_DVV_ID', references: 'Teams' }
  })

  pgm.addConstraint('Participations', 'Unique Participation', {
    unique: ['Team_DVV_ID', 'Tournament_DVV_ID']
  })
}
