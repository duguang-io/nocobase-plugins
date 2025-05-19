import { Migration } from '@nocobase/server';
import { DataTypes } from '@nocobase/database';

export default class extends Migration {
  // 在插件加载前执行
  on = 'beforeLoad';

  // 指定此迁移适用于低于1.5.17版本的系统
  appVersion = '<1.5.18';

  async up() {
    const queryInterface = this.queryInterface;

    // 1. 添加字段到表结构
    // metabaseDashboardConfiguration表添加expiration字段，默认值为10
    await queryInterface.addColumn(
      this.db.getCollection('metabaseDashboardConfiguration').model.tableName,
      'expiration',
      {
        type: DataTypes.INTEGER,
        defaultValue: 10,  // 设置默认值为10分钟
        allowNull: false,
      }
    );

    // metabaseDashboard表添加refresh字段，默认为null
    await queryInterface.addColumn(
      this.db.getCollection('metabaseDashboard').model.tableName,
      'refresh',
      {
        type: DataTypes.INTEGER,
        // 不设置defaultValue，默认值就是null
        allowNull: true,
      }
    );

    // metabaseDashboard表添加refreshEnabled字段，默认为false
    await queryInterface.addColumn(
      this.db.getCollection('metabaseDashboard').model.tableName,
      'refreshEnabled',
      {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }
    );


    // 2. 数据同步：更新现有记录，为expiration字段设置默认值
    // 为metabaseDashboardConfiguration表中所有expiration为null的记录设置默认值
    await this.db.getRepository('metabaseDashboardConfiguration').update({
      filter: {
        expiration: null,
      },
      values: {
        expiration: 10,  // 默认10分钟
      }
    });

    // 为metabaseDashboard表中所有refreshEnabled为null的记录设置默认值
    await this.db.getRepository('metabaseDashboard').update({
      filter: {
        refreshEnabled: null,
      },
      values: {
        refreshEnabled: false,
      }
    });
    // refresh字段保持为null，不进行数据同步
  }

  async down() {
    const queryInterface = this.queryInterface;

    // 移除添加的字段，顺序与添加相反
    await queryInterface.removeColumn(
      this.db.getCollection('metabaseDashboard').model.tableName,
      'refreshEnabled'
    )
    await queryInterface.removeColumn(
      this.db.getCollection('metabaseDashboard').model.tableName,
      'refresh'
    );

    await queryInterface.removeColumn(
      this.db.getCollection('metabaseDashboardConfiguration').model.tableName,
      'expiration'
    );
    
  }
}