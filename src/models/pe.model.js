// Model: Pe (Pé de Planta)
export default (sequelize, DataTypes) => {
const Pe = sequelize.define('Pe', {
    id_pe: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    fk_id_talhao: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    nome: { 
      type: DataTypes.STRING(50), 
      allowNull: false 
    },
    situacao: { 
      type: DataTypes.ENUM('tratado', 'nao tratado', 'sem informacoes'), 
      defaultValue: 'sem informacoes' 
    },
    latitude: { 
      type: DataTypes.DECIMAL(10, 7) 
    },
    longitude: { 
      type: DataTypes.DECIMAL(10, 7) 
    }
  }, 
  { 
    tableName: 'pes',
    timestamps: false 
  });
  return Pe;
}