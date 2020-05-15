module.exports = (sequelize, DataType) => {
    return sequelize.define(
        'post',
        {
            title: {
                type: DataType.STRING,
                allowNull: false,
            },
            author: {
                type: DataType.STRING(100),
                allowNull: false,
            },
            content: {
                type: DataType.TEXT,
                allowNull: false,
            },
        },
        {
            classMethods: {},
            tableName: 'post',
            underscored: true,
        }
    );
};
