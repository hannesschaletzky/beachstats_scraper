/* eslint-disable no-undef */

exports.up = (pgm) => {
  pgm.addConstraint('Teams', 'ForeignKey_Player1', {
    foreignKeys: {
      columns: 'Player_1_id',
      references: 'Players'
    }
  })

  pgm.addConstraint('Teams', 'ForeignKey_Player2', {
    foreignKeys: {
      columns: 'Player_2_id',
      references: 'Players'
    }
  })
}
