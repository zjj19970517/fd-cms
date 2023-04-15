import React, { useEffect } from 'react';
import { Card, Typography } from '@arco-design/web-react';

import styles from './style.module.less';
import './route.less';

/**
 * 绘制路线 Demo 页
 * @returns
 */
function DrawRoutePage() {
  useEffect(() => {
    const amap = createAmap('container');

    addRoutePlan(amap);
  }, []);

  return (
    <Card className={'com-content__card--height'}>
      <Typography.Title heading={6}>
        高德地图 - 添加可交互多边形区域
      </Typography.Title>

      <Typography.Text type="secondary">
        路线规划种类有：驾车、公交、步行、骑乘和货车等，以驾车规划为例。驾车路线规划需要使用
        AMap.Driving 插件。
      </Typography.Text>

      <div id="container" className={styles.map}></div>
      <div id="panel"></div>
    </Card>
  );
}

/**
 * 创建地图实例
 * @param id
 * @returns
 */
function createAmap(id: string): AMap.Map {
  // Map 实例配置选项
  const mapOptions: AMap.MapOptions = {
    center: [116.397428, 39.90923], // 地图中心点
    zoom: 14, // 地图显示的缩放级别
  };

  // 创建地图对象
  return new AMap.Map(id, mapOptions);
}

/**
 * 添加路线规划
 * @param amap 地图实例
 */
function addRoutePlan(amap: AMap.Map) {
  AMap.plugin('AMap.Driving', function () {
    console.log('插件 load 成功');
    // 构造路线导航类
    const driving = new AMap.Driving({
      map: amap,
      panel: 'panel',
    });
    // 根据起终点名称规划驾车导航路线
    driving.search(
      [
        { keyword: '北京市地震局(公交站)', city: '北京' },
        { keyword: '亦庄文化园(地铁站)', city: '北京' },
      ],
      function (status, result) {
        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        if (status === 'complete') {
          console.log('绘制驾车路线完成');
        } else {
          console.error('获取驾车数据失败：' + result);
        }
      }
    );
  });
}

export default DrawRoutePage;
