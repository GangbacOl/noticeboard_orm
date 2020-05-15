module.exports = (sequelize, DataType) => {
    return sequelize.define(
        'user',
        {
            account: {
                type: DataType.STRING(45),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataType.STRING(45),
                allowNull: false,
            },
            username: {
                type: DataType.STRING(100),
                allowNull: false,
            },
        },
        {
            classMethods: {},
            tableName: 'user',
            underscored: true,
        }
    );
};
