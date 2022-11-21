/* eslint-disable no-undef */

exports.up = (pgm) => {
  pgm.createTable('Tour_Results', {
    ID: { type: 'serial', primaryKey: true },
    Place: { type: 'integer', notNull: true },
    Team_DVV_ID: { type: 'integer', notNull: true },
    Points: { type: 'integer' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  // pgm.addConstraint('Tour_Results', 'ForeignKey Team_DVV_ID', {
  //   foreignKeys: { columns: 'Team_DVV_ID', references: 'Teams' }
  // })
}
