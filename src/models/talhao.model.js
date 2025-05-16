// Model: Talhao
const Talhao = sequelize.define('Talhao', {
    id_talhao: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    fk_id_propriedade: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    nome: { 
      type: DataTypes.STRING(50), 
      allowNull: false 
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
    tableName: 'talhoes',
    timestamps: false 
  });  