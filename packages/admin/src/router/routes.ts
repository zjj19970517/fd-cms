import { IRoute } from './route';

// 路由配置中心
const routes: IRoute[] = [
  {
    name: 'menu.dashboard',
    key: 'dashboard', // key 这里同 path，同时也对应 page 路径、icon
    children: [
      {
        name: 'menu.dashboard.workplace',
        key: 'dashboard/workplace',
      },
    ],
  },
  {
    name: 'Example',
    key: 'example',
  },
];

export default routes;
