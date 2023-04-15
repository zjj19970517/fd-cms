import '@amap/amap-jsapi-types';

export interface ControlBarOptions {
  position?: Record<string, unknown>;
  showZoomBar?: boolean;
  showControlButton?: boolean;
}

export interface ScaleOptions {
  position?: Record<string, unknown>;
}

export interface ToolBarOption {
  position?: Record<string, unknown>;
}

export interface DrivingOptions {
  map: AMap.Map;
  panel: string | HTMLElement;
}

declare global {
  namespace AMap {
    class Scale extends Control {
      constructor(opts?: ScaleOptions);
    }

    class ToolBar extends Control {
      constructor(opts?: ToolBarOption);
    }

    class ControlBar extends Control {
      constructor(opts?: ControlBarOptions);
    }

    class Driving {
      constructor(opts?: DrivingOptions);

      search(
        points: Array<{ keyword: string; city: string }>,
        callback: (status: string, result: unknown) => void
      );
    }

    export { Scale, ToolBar, ControlBar, Driving };
  }
}
