export default DataTypes => ({
  columns: {
    categoryId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(11),
      comment: ''
    },
    postId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(11),
      comment: ''
    }
  },
  table: {
    tableName: 'eva_blog_categories_posts',
    freezeTableName: true,
    timestamps: false
  }
});
