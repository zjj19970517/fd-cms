import React from 'react';
import { IconDashboard, IconRobot, IconTag } from '@arco-design/web-react/icon';

import styles from '../style/menu-icon.module.less';

/**
 * 通过 route key 获取对应的 icon 组件
 * 只给根级路由配置 icon，children 中的 route 不需要配置 icon
 * @param key
 * @returns
 */
export function getIconFromKey(key) {
  switch (key) {
    case 'dashboard':
      return <IconDashboard className={styles.icon} />;
    case 'example':
      return <IconTag className={styles.icon} />;
    case 'map-examples':
      return <IconRobot className={styles.icon} />;
    default:
      return <div className={styles['icon-empty']} />;
  }
}
