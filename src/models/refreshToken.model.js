// src/models/refreshToken.model.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    token: { 
      type: DataTypes.STRING(512), // Usando VARCHAR com limite de 512 caracteres
      allowNull: false, 
      unique: true 
    },
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    expiresAt: { 
      type: DataTypes.DATE, 
      allowNull: false 
    }
  }, 
  { 
    tableName: 'refresh_tokens',
    timestamps: false 
  });  

  return RefreshToken;
}