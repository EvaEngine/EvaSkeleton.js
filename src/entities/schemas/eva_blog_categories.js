export default DataTypes => ({
  columns: {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      comment: ''
    },
    categoryName: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: ''
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: ''
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
      comment: ''
    },
    parentId: {
      allowNull: true,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: ''
    },
    rootId: {
      allowNull: true,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: ''
    },
    sortOrder: {
      allowNull: true,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: ''
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.INTEGER(10),
      comment: ''
    },
    count: {
      allowNull: true,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: ''
    },
    leftId: {
      allowNull: true,
      type: DataTypes.INTEGER(15),
      defaultValue: '0',
      comment: ''
    },
    rightId: {
      allowNull: true,
      type: DataTypes.INTEGER(15),
      defaultValue: '0',
      comment: ''
    },
    imageId: {
      allowNull: true,
      type: DataTypes.INTEGER(10),
      comment: ''
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: ''
    }
  },
  table: {
    tableName: 'eva_blog_categories',
    freezeTableName: true,
    timestamps: false
  }
});
