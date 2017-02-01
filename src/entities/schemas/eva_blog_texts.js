export default DataTypes => ({
  columns: {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      comment: 'ID'
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER(20),
      comment: '文章ID'
    },
    metaKeywords: {
      allowNull: true,
      type: DataTypes.TEXT,
      comment: 'Meta Keywords'
    },
    metaDescription: {
      allowNull: true,
      type: DataTypes.TEXT,
      comment: 'Meta Description'
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
      comment: '文章正文'
    }
  },
  table: {
    tableName: 'eva_blog_texts',
    freezeTableName: true,
    timestamps: false
  }
});
