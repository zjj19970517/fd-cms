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
    name: 'menu.map_example',
    key: 'map-examples',
    children: [
      {
        name: 'menu.map_example.quick_start',
        key: 'map-examples/quick-start',
      },
      {
        name: 'menu.map_example.add_region',
        key: 'map-examples/add-region',
      },
      {
        name: 'menu.map_example.draw_route',
        key: 'map-examples/draw-route',
      },
    ],
  },
];

export default routes;
