import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Spin } from '@arco-design/web-react';
import cs from 'classnames';
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon';
import { useSelector } from 'react-redux';
import qs from 'query-string';
import NProgress from 'nprogress';

// components
import Navbar from './components/NavBar';
import Footer from './components/Footer';

// utils
import useRoute from '@/router';
import { isArray } from './utils/is';
import useLocale from './utils/useLocale';
import getUrlParams from './utils/getUrlParams';
import lazyload from './utils/lazyload';
import { getIconFromKey } from './router/icons';

// styles
import styles from './style/layout.module.less';

// types
import { IRoute } from './router/route';
import { GlobalState } from './store';

// defines
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;
const Content = Layout.Content;

/**
 * 扁平化的所有子路由，注册对应的 component
 * @param routes
 * @returns
 */
function getFlattenRoutes(routes: IRoute[]) {
  // 匹配到所有 pages 下的 tsx 页面
  const mod = import.meta.glob('./pages/**/[a-z[]*.tsx');
  const res = [];
  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && !route.children) {
        // 设置当前路由所对应的 component
        route.component = lazyload(mod[`./pages/${route.key}/index.tsx`]);
        res.push(route);
      } else if (isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }
  // 遍历迭代 routes
  travel(routes);
  return res;
}

/**
 * @page 核心布局页面
 * @returns
 */
function PageLayout() {
  // 获取 url 参数
  const urlParams = getUrlParams();
  const history = useHistory();
  // 解析出 pathname
  const pathname = history.location.pathname;
  // 通过 pathname 解析出当前页面所对应的组件的 key
  // 通过该 key 可以获取到对应的组件
  const currentComponent = qs.parseUrl(pathname).url.slice(1);

  // 获取当前的语言类型
  const locale = useLocale();

  // 从 store 中解析出 state
  const { settings, userLoading, userInfo } = useSelector(
    (state: GlobalState) => state
  );

  // 基于用户的角色权限，获取对应的所有路由
  const [routes, defaultRoute] = useRoute(userInfo?.permissions);

  const defaultSelectedKeys = [currentComponent || defaultRoute];
  const paths = (currentComponent || defaultRoute).split('/');
  const defaultOpenKeys = paths.slice(0, paths.length - 1);

  // 面包屑数组
  const [breadcrumb, setBreadCrumb] = useState([]);
  // 是否折叠左侧菜单条
  const [collapsed, setCollapsed] = useState<boolean>(false);
  // 当前选中的菜单项的 keys
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(defaultSelectedKeys);
  // 当前打开的菜单 subMenu 的 keys
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  // 存储当前展示的所有的路由信息
  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());
  // 存储当前展示的所有 menu 信息
  const menuMap = useRef<
    Map<string, { menuItem?: boolean; subMenu?: boolean }>
  >(new Map());
  // 导航条的高度
  const navbarHeight = 60;
  // menu 菜单的宽度
  const menuWidth = collapsed ? 48 : settings.menuWidth;
  // 是否展示导航条
  const showNavbar = settings.navbar && urlParams.navbar !== false;
  // 是否展示菜单
  const showMenu = settings.menu && urlParams.menu !== false;
  // 是否展示底部 Footer
  const showFooter = settings.footer && urlParams.footer !== false;

  // computed style
  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {};
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };

  useEffect(() => {
    const routeConfig = routeMap.current.get(pathname);
    // 更新面包屑
    setBreadCrumb(routeConfig || []);
    // 更新菜单状态
    updateMenuStatus();
  }, [pathname]);

  // 扁平化所有子路由，匹配对应的 component
  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);

  /**
   * 点击某个菜单项，打开某个页面
   * @param key
   */
  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    const component = currentRoute.component;
    // 触发将要打开页面的加载（原因是因为 page 都是 lazy 动态加载模式）
    const preload = component.preload();
    // 进度条播放
    NProgress.start();
    // 加载结束后
    preload.then(() => {
      // 打开该页面
      history.push(currentRoute.path ? currentRoute.path : `/${key}`);
      // 停止进度条
      NProgress.done();
    });
  }

  // 切换菜单的折叠状态
  function toggleCollapse() {
    setCollapsed((collapsed) => !collapsed);
  }

  /**
   * 基于路由信息渲染 Menu 菜单内容
   * @param locale 语言
   * @returns
   */
  function renderRoutes(locale) {
    // 每次渲染之前，先清空 routeMap
    routeMap.current.clear();

    // 返回一个 travel 执行方法
    // _routes 表示当前层级的所有 route
    // level 表示当前层级
    return function travel(_routes: IRoute[], level, parentNode = []) {
      return _routes.map((route) => {
        const { breadcrumb = true, ignore } = route;
        const iconDom = getIconFromKey(route.key);
        const titleDom = (
          <>
            {iconDom} {locale[route.name] || route.name}
          </>
        );

        routeMap.current.set(
          `/${route.key}`,
          breadcrumb ? [...parentNode, route.name] : []
        );

        // 过滤出需要展示的子路由
        const visibleChildren = (route.children || []).filter((child) => {
          const { ignore, breadcrumb = true } = child;
          if (ignore || route.ignore) {
            routeMap.current.set(
              `/${child.key}`,
              breadcrumb ? [...parentNode, route.name, child.name] : []
            );
          }

          return !ignore;
        });

        if (ignore) {
          return '';
        }

        if (visibleChildren.length) {
          menuMap.current.set(route.key, { subMenu: true });
          return (
            <SubMenu key={route.key} title={titleDom}>
              {travel(visibleChildren, level + 1, [...parentNode, route.name])}
            </SubMenu>
          );
        }
        menuMap.current.set(route.key, { menuItem: true });
        return <MenuItem key={route.key}>{titleDom}</MenuItem>;
      });
    };
  }

  /**
   * 根据 pathname 更新 Menus 状态
   */
  function updateMenuStatus() {
    const pathKeys = pathname.split('/');
    const newSelectedKeys: string[] = [];
    const newOpenKeys: string[] = [...openKeys];
    while (pathKeys.length > 0) {
      const currentRouteKey = pathKeys.join('/');
      const menuKey = currentRouteKey.replace(/^\//, '');
      const menuType = menuMap.current.get(menuKey);
      if (menuType && menuType.menuItem) {
        newSelectedKeys.push(menuKey);
      }
      if (menuType && menuType.subMenu && !openKeys.includes(menuKey)) {
        newOpenKeys.push(menuKey);
      }
      pathKeys.pop();
    }
    setSelectedKeys(newSelectedKeys);
    setOpenKeys(newOpenKeys);
  }

  return (
    <Layout className={styles.layout}>
      {/* 导航条 */}
      <div
        className={cs(styles['layout-navbar'], {
          [styles['layout-navbar-hidden']]: !showNavbar,
        })}
      >
        <Navbar show={showNavbar} />
      </div>
      {userLoading ? (
        <Spin className={styles['spin']} />
      ) : (
        <Layout>
          {/* 左侧菜单 */}
          {showMenu && (
            <Sider
              className={styles['layout-sider']}
              width={menuWidth}
              collapsed={collapsed}
              onCollapse={setCollapsed}
              trigger={null}
              collapsible
              breakpoint="xl"
              style={paddingTop}
            >
              <div className={styles['menu-wrapper']}>
                <Menu
                  collapse={collapsed}
                  onClickMenuItem={onClickMenuItem}
                  selectedKeys={selectedKeys}
                  openKeys={openKeys}
                  onClickSubMenu={(_, openKeys) => {
                    setOpenKeys(openKeys);
                  }}
                >
                  {renderRoutes(locale)(routes, 1)}
                </Menu>
              </div>
              <div className={styles['collapse-btn']} onClick={toggleCollapse}>
                {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
              </div>
            </Sider>
          )}
          {/* 右侧核心布局内容 */}
          <Layout className={styles['layout-content']} style={paddingStyle}>
            <div className={styles['layout-content-wrapper']}>
              {/* 面包屑导航 */}
              {!!breadcrumb.length && (
                <div className={styles['layout-breadcrumb']}>
                  <Breadcrumb>
                    {breadcrumb.map((node, index) => (
                      <Breadcrumb.Item key={index}>
                        {typeof node === 'string' ? locale[node] || node : node}
                      </Breadcrumb.Item>
                    ))}
                  </Breadcrumb>
                </div>
              )}

              {/* 主题内容 */}
              <Content>
                <Switch>
                  {/* 添加所有的路由配置 */}
                  {flattenRoutes.map((route, index) => {
                    return (
                      <Route
                        key={index}
                        path={`/${route.key}`}
                        component={route.component}
                      />
                    );
                  })}
                  {/* 访问 / 时，重定向至默认路由 */}
                  <Route exact path="/">
                    <Redirect to={`/${defaultRoute}`} />
                  </Route>
                  {/* 资源不存在 */}
                  <Route
                    path="*"
                    component={lazyload(() => import('./pages/exception/403'))}
                  />
                </Switch>
              </Content>
            </div>

            {/* 底部信息 */}
            {showFooter && <Footer />}
          </Layout>
        </Layout>
      )}
    </Layout>
  );
}

export default PageLayout;
