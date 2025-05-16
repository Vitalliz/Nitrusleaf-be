// Model: Pessoa
const Pessoa = sequelize.define('Pessoa', {
  id_pessoa: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  fk_id_cargo: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  status: { 
    type: DataTypes.ENUM('ativo', 'inativo'), 
    defaultValue: 'ativo' 
  },
  nome: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  sobrenome: { 
    type: DataTypes.STRING(100) 
  },
  data_criacao: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  observacoes: { 
    type: DataTypes.TEXT 
  },
  foto_perfil: { 
    type: DataTypes.TEXT 
  },
  logradouro: { 
    type: DataTypes.STRING(150) 
  },
  numero: { 
    type: DataTypes.STRING(20) 
  },
  bairro: { 
    type: DataTypes.STRING(50) 
  },
  cidade: { 
    type: DataTypes.STRING(50) 
  },
  telefone: { 
    type: DataTypes.STRING(20) 
  },
  celular: { 
    type: DataTypes.STRING(20) 
  },
  email: { 
    type: DataTypes.STRING(100), 
    unique: true, 
    allowNull: false 
  },
  senha_hash: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  }
}, 
{ 
  tableName: 'pessoas',
  timestamps: false 
});