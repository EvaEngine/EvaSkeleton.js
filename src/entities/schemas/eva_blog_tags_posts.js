export default DataTypes => ({
  columns: {
    tagId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
      comment: 'TAG ID'
    },
    postId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
      comment: 'POST ID'
    }
  },
  table: {
    tableName: 'eva_blog_tags_posts',
    freezeTableName: true,
    timestamps: false
  }
});
