import { Model, DataTypes } from 'sequelize';
import dbConnection from '../database/postgres';


class User extends Model {
  id!: number;

  // attributes
  public name!: string;
  public email!: string;
  public password!: string;
  public facebookId!: string;
  public googleId!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // attributes
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // This will use validator.js's isEmail method
    }
    // set(value: string) {
    //   this.setDataValue("email", value.toLowerCase());
    // }
  },
  facebookId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  }
}, {
  sequelize: dbConnection,
  freezeTableName: true,
  tableName: 'w_users',
  timestamps: true,
});

export default User;

if (process.env.NODE_ENV !== 'production') {
  // User.sync({ force: true }).then(() => console.log("User table reset!"));
  User.sync({ alter: true }).then(() => console.log("User table synced!"));
}

export const syncUser = async () => {
  try {
    await User.count();
    console.log('User model synchronized successfully.');
  } catch (error) {
    console.error('Unable to sync User model:', error);
  }
};