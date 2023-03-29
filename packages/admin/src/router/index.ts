import { useEffect, useMemo, useState } from 'react';

import routes from './routes';
import { IRoute } from './route';
import auth from '@/utils/authentication';

/**
 * 路由 Hooks
 * @param userPermission 用户权限
 * @returns
 */
const useRoute = (userPermission): [IRoute[], string] => {
  const filterRoute = (routes: IRoute[], arr = []): IRoute[] => {
    if (!routes.length) {
      return [];
    }
    for (const route of routes) {
      const { requiredPermissions, oneOfPerm } = route;
      let visible = true;
      if (requiredPermissions) {
        visible = auth({ requiredPermissions, oneOfPerm }, userPermission);
      }

      if (!visible) {
        continue;
      }
      if (route.children && route.children.length) {
        const newRoute = { ...route, children: [] };
        filterRoute(route.children, newRoute.children);
        if (newRoute.children.length) {
          arr.push(newRoute);
        }
      } else {
        arr.push({ ...route });
      }
    }

    return arr;
  };

  const [permissionRoute, setPermissionRoute] = useState(routes);

  useEffect(() => {
    // TODO: 这里默认会执行一次吗 ？
    // 基于用户权限过滤出符合当前权限的路由表
    const newRoutes = filterRoute(routes);
    setPermissionRoute(newRoutes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(userPermission)]);

  // 计算出默认路由
  // 打开页面后，默认打开第一个路由
  const defaultRoute = useMemo(() => {
    const first = permissionRoute[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.key || first.key;
      return firstRoute;
    }
    return '';
  }, [permissionRoute]);

  return [permissionRoute, defaultRoute];
};

/**
 * 通过 path 查找对应的路由名称
 * @param path
 * @param routes 完整的路由表数组
 * @returns
 */
export const getName = (path: string, routes) => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.name;
    } else if (item.children) {
      return getName(path, item.children);
    }
  });
};

export const generatePermission = (role: string) => {
  const actions = role === 'admin' ? ['*'] : ['read'];
  const result = {};
  routes.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        result[child.name] = actions;
      });
    }
  });
  return result;
};

export default useRoute;
