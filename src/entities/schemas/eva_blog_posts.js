export default DataTypes => ({
  columns: {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      comment: 'ID'
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(255),
      comment: '标题'
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('deleted', 'draft', 'published', 'pending'),
      defaultValue: 'pending',
      comment: '状态'
    },
    visibility: {
      allowNull: false,
      type: DataTypes.ENUM('public', 'private', 'password'),
      defaultValue: 'public',
      comment: '可见性'
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING(10),
      defaultValue: 'article',
      comment: '分类'
    },
    codeType: {
      allowNull: false,
      type: DataTypes.STRING(30),
      defaultValue: 'markdown',
      comment: '原始代码类型'
    },
    language: {
      allowNull: true,
      type: DataTypes.STRING(5),
      defaultValue: 'en',
      comment: '语言'
    },
    parentId: {
      allowNull: false,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: '父ID'
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING(100),
      comment: '唯一标示'
    },
    sortOrder: {
      allowNull: false,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: '排序'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.INTEGER(10),
      comment: '创建时间'
    },
    userId: {
      allowNull: false,
      type: DataTypes.BIGINT,
      defaultValue: '0',
      comment: '创建用户ID'
    },
    username: {
      allowNull: true,
      type: DataTypes.STRING(64),
      comment: '创建用户名'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: '更新时间'
    },
    editorId: {
      allowNull: true,
      type: DataTypes.BIGINT,
      defaultValue: '0',
      comment: '更新用户ID'
    },
    editorName: {
      allowNull: true,
      type: DataTypes.STRING(255),
      comment: '更新用户ID'
    },
    commentStatus: {
      allowNull: false,
      type: DataTypes.ENUM('open', 'closed', 'authority'),
      defaultValue: 'open',
      comment: '评论状态'
    },
    commentType: {
      allowNull: false,
      type: DataTypes.STRING(15),
      defaultValue: 'local',
      comment: '评论类型'
    },
    commentCount: {
      allowNull: false,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: '评论数量'
    },
    viewCount: {
      allowNull: false,
      type: DataTypes.BIGINT,
      defaultValue: '0',
      comment: '访问量'
    },
    imageId: {
      allowNull: false,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: '封面ID'
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING(300),
      comment: '封面URL'
    },
    summary: {
      allowNull: true,
      type: DataTypes.STRING(500),
      comment: '摘要'
    },
    sourceName: {
      allowNull: true,
      type: DataTypes.STRING(50),
      comment: '来源'
    },
    sourceUrl: {
      allowNull: true,
      type: DataTypes.STRING(255),
      comment: '来源Url'
    },
    deletedAt: {
      allowNull: false,
      type: DataTypes.INTEGER(10),
      defaultValue: '0',
      comment: '删除时间'
    }
  },
  table: {
    tableName: 'eva_blog_posts',
    freezeTableName: true,
    indexes: [
      {
        name: 'createdAt',
        fields: ['createdAt']
      },
      {
        name: 'status',
        fields: ['status', 'type']
      }
    ],
    timestamps: false
  }
});
