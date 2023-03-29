import { AuthParams } from '@/utils/authentication';

// 路由配置信息
export type IRoute = AuthParams & {
  name: string; // 路由名称
  key: string; // 唯一 key
  breadcrumb?: boolean; // 当前页是否展示面包屑
  ignore?: boolean; // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问
  children?: IRoute[]; // 子路由
};
