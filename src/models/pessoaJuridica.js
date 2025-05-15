export default (sequelize, DataTypes) => {
    const Pessoa_juridicas = sequelize.define('Pessoa_juridica', {
        id_pessoa: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cnpj: {
            type: DataTypes.STRING(100),
            
        }
    }

    )
}