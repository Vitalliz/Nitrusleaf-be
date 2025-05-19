// Model: Pessoa
export default (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    id_pessoa: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    fk_id_cargo: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: {
        notNull: { msg: "Cargo é obrigatório." },
        isInt: { msg: "Cargo deve ser um número inteiro." }
      }
    },
    status: { 
      type: DataTypes.ENUM('ativo', 'inativo'), 
      defaultValue: 'ativo' 
    },
    nome: { 
      type: DataTypes.STRING(100), 
      allowNull: false,
      validate: {
        notNull: { msg: "Nome é obrigatório." },
        len: { args: [1, 100], msg: "Nome deve ter entre 1 e 100 caracteres." }
      }
    },
    sobrenome: { 
      type: DataTypes.STRING(100), 
      allowNull: true 
    },
    data_criacao: { 
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW 
    },
    observacoes: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    foto_perfil: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    logradouro: { 
      type: DataTypes.STRING(150), 
      allowNull: true 
    },
    numero: { 
      type: DataTypes.STRING(20), 
      allowNull: true 
    },
    bairro: { 
      type: DataTypes.STRING(50), 
      allowNull: true 
    },
    cidade: { 
      type: DataTypes.STRING(50), 
      allowNull: true 
    },
    telefone: { 
      type: DataTypes.STRING(20), 
      allowNull: true 
    },
    celular: { 
      type: DataTypes.STRING(20), 
      allowNull: true 
    },
    email: { 
      type: DataTypes.STRING(100), 
      unique: {
        msg: "O email já está em uso. Tente outro."
      },
      allowNull: false,
      validate: {
        notNull: { msg: "Email é obrigatório." },
        isEmail: { msg: "Email deve ser válido." }
      }
    },
    senha_hash: { 
      type: DataTypes.TEXT, 
      allowNull: false,
      validate: {
        notNull: { msg: "Senha é obrigatória." },
        len: { args: [6, 100], msg: "Senha deve ter no mínimo 6 caracteres." }
      }
    }
  }, 
  { 
    tableName: 'pessoas',
    timestamps: false 
  });

  return Pessoa;
};
