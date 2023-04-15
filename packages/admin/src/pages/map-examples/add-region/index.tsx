import React, { useEffect } from 'react';
import { Card, Typography } from '@arco-design/web-react';

import { shanghai, suzhou, wuxi } from './demo-data';

import styles from './style.module.less';

type LngLat = AMap.LngLat; // 经纬度数据集

// 多边形数据
type PolygonData =
  | Array<LngLat>
  | Array<Array<LngLat>>
  | Array<Array<Array<LngLat>>>;

/**
 * @page 添加可交互多边形区域 Demo 页
 * @returns
 */
function AddRegionPage() {
  useEffect(() => {
    // 创建地图
    const amap = createAmap('container');
    // 创建多边形区域
    addPolygon(shanghai as unknown as PolygonData, amap);
    addPolygon(suzhou as unknown as PolygonData, amap);
    addPolygon(wuxi as unknown as PolygonData, amap);
  }, []);

  return (
    <Card className={'com-content__card--height'}>
      <Typography.Title heading={6}>
        高德地图 - 添加可交互多边形区域
      </Typography.Title>

      <Typography.Text type="secondary">
        多边形矢量图Polygon，是地图覆盖物重要的地图要素，可以用来突出标记某个区域的形状。矢量图覆盖物种类繁多，使用者可以根据自己实际需求来选择合适的类型。
      </Typography.Text>

      <Typography.Text type="secondary">
        如何在地图图面上添加一个可交互的多边形 ?
      </Typography.Text>

      <div id="container" className={styles.map}></div>
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
    viewMode: '2D', // 2D：平面模式，3D：带有俯仰角的 3D 模式
    center: [121.045332, 31.19884],
    zoom: 8.8,
  };

  // 创建地图对象
  return new AMap.Map(id, mapOptions);
}

/**
 * 添加多边形区域
 * @param data 多边形数据
 * @param amap 地图实例
 */
function addPolygon(data: PolygonData, amap: AMap.Map) {
  const option = {
    path: data,
    fillColor: '#ccebc5',
    strokeOpacity: 1,
    fillOpacity: 0.5,
    strokeColor: '#2b8cbe',
    strokeWeight: 1,
    strokeStyle: 'dashed',
    strokeDasharray: [5, 5],
  } as AMap.PolygonOptions;

  const polygon = new AMap.Polygon();

  polygon.setOptions(option);

  polygon.on('mouseover', () => {
    polygon.setOptions({
      fillOpacity: 0.7,
      fillColor: '#7bccc4',
    });
  });

  polygon.on('mouseout', () => {
    polygon.setOptions({
      fillOpacity: 0.5,
      fillColor: '#ccebc5',
    });
  });

  amap.add(polygon);
}

export default AddRegionPage;
