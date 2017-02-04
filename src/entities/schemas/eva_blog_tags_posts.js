export default DataTypes => ({
  columns: {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      comment: 'ID'
    },
    tagId: {
      allowNull: false,
      type: DataTypes.INTEGER(10),
      comment: 'TAG ID'
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER(10),
      comment: 'POST ID'
    }
  },
  table: {
    tableName: 'eva_blog_tags_posts',
    freezeTableName: true,
    indexes: [
      {
        name: 'tagId',
        unique: true,
        fields: ['tagId', 'postId']
      }
    ],
    timestamps: false
  }
});
