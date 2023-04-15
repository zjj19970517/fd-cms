import React, { useEffect } from 'react';
import { Card, Typography } from '@arco-design/web-react';

import styles from './style.module.less';
import './marker.less';

/**
 * @page 快速入门页面
 * @returns
 */
function QuickStartPage() {
  useEffect(() => {
    createAmap('container');
  }, []);

  return (
    <Card className={'com-content__card--height'}>
      <Typography.Title heading={6}>高德地图 - 入门案例</Typography.Title>

      <Typography.Text type="secondary">
        展示地图、创建图层（路况）、添加地图控件
      </Typography.Text>

      <div id="container" className={styles.map}></div>
    </Card>
  );
}

function createAmap(id: string) {
  // 创建实时交通路况图层
  // 实时交通图层用于展示当前时刻的道路交通状况，不同的颜色代表不同的拥堵程度，暗红色代表极度拥堵，绿色代表通畅，灰色代表路况不明。
  const traffic = new AMap.TileLayer.Traffic({
    autoRefresh: true, // 是否自动刷新，默认为false
    interval: 180, // 刷新间隔，默认180s
  });

  // Map 实例配置选项
  const mapOptions: AMap.MapOptions = {
    viewMode: '2D', // 2D：平面模式，3D：带有俯仰角的 3D 模式
    center: [116.397428, 39.90923], // 初始化地图中心点
    zoom: 11, // 初始化地图可见级别
    // mapStyle: 'amap://styles/whitesmoke', // 设置地图的显示样式
  };

  // 创建地图对象
  const amap = new AMap.Map(id, mapOptions);
  // 添加图层
  amap.add(traffic);

  // 添加地图控件
  loadPlugins(() => {
    // 比例尺
    const scale = new AMap.Scale();
    // 工具条
    const toolBar = new AMap.ToolBar();
    // 控制条
    const controlBar = new AMap.ControlBar({
      position: {
        top: '10px',
        right: '200px',
      },
    });

    amap.addControl(toolBar);
    amap.addControl(scale);
    amap.addControl(controlBar);
  });

  // 添加标记点
  const marker = createMarker();
  amap.add(marker);

  return amap;
}

function createMarker() {
  // 点标记显示内容，HTML要素字符串
  const markerContent =
    '' +
    '<div class="custom-content-marker">' +
    '   <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">' +
    '   <div class="close-btn" onclick="clearMarker()">X</div>' +
    '</div>';
  const position = new AMap.LngLat(116.397428, 39.90923); // Marker经纬度
  const marker = new AMap.Marker({
    position: position,
    content: markerContent, // 将 html 传给 content
    offset: new AMap.Pixel(-13, -30), // 以 icon 的 [center bottom] 为原点
  });
  return marker;
}

function loadPlugins(cb: () => unknown) {
  AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.ControlBar'], function () {
    cb && cb();
  });
}

export default QuickStartPage;
