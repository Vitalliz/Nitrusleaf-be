// Model: Propriedade
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
      type: DataTypes.STRING(100), 
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