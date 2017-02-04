export default DataTypes => ({
  columns: {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      comment: 'ID'
    },
    tagName: {
      allowNull: false,
      type: DataTypes.STRING(30),
      unique: true,
      comment: 'Tag名'
    },
    parentId: {
      allowNull: true,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: '父ID'
    },
    rootId: {
      allowNull: true,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: '根ID'
    },
    sortOrder: {
      allowNull: true,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: '排序编号'
    },
    count: {
      allowNull: true,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: '统计'
    }
  },
  table: {
    tableName: 'eva_blog_tags',
    freezeTableName: true,
    indexes: [
      {
        name: 'tagName',
        unique: true,
        fields: ['tagName']
      }
    ],
    timestamps: false
  }
});
