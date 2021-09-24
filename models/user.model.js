module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      set(value) {
        let dateObj = new Date(value)
        this.setDataValue('dob', dateObj)
      }
    }
  })
  return User
}