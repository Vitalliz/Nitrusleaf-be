// Model: Propriedade
export default (sequelize, DataTypes) => {
const Propriedade = sequelize.define('Propriedade', {
    id_propriedade: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    fk_id_proprietario: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    nome: { 
      type: DataTypes.STRING(160), 
      allowNull: false 
    },
    talhoes_registrados: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0 
    },
    total_pes: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0 
    },
    pes_analisados: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0 
    },
    pes_diagnosticados: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0 
    }
  }, 
  { 
    tableName: 'propriedades',
    timestamps: false 
  });  
  return Propriedade;
}