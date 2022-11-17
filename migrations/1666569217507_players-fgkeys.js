/* eslint-disable no-undef */

exports.up = (pgm) => {
  pgm.addConstraint('Teams', 'ForeignKey_Player1', {
    foreignKeys: {
      columns: 'Player_1_DVV_ID',
      references: 'Players'
    }
  })

  pgm.addConstraint('Teams', 'ForeignKey_Player2', {
    foreignKeys: {
      columns: 'Player_2_DVV_ID',
      references: 'Players'
    }
  })
}
