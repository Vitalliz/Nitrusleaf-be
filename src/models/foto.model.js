// Model: Foto
const Foto = sequelize.define('Foto', {
    id_foto: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    fk_id_pe: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    url: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    data_foto: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    resultado_analise: { 
      type: DataTypes.STRING(100) 
    }
  }, 
  { 
    tableName: 'fotos',
    timestamps: false 
  });  