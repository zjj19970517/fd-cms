import './style/global.less';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

// components
import PageLayout from './layout';
import Login from './pages/login';

import rootReducer from './store';
import { GlobalContext } from './context';
import checkLogin from './utils/checkLogin';
import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';
import './mock';

const store = createStore(rootReducer);

function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'en-US');
  const [theme, setTheme] = useStorage('arco-theme', 'light');

  // 获取 Arco 的语言包配置
  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  // 请求获取用户信息
  function fetchUserInfo() {
    // TODO: 继续研读
    store.dispatch({
      type: 'update-userInfo',
      payload: { userLoading: true },
    });
    axios.get('/api/user/userInfo').then((res) => {
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: res.data, userLoading: false },
      });
    });
  }

  useEffect(() => {
    if (checkLogin()) {
      // 登录成功后，请求获取用户信息
      fetchUserInfo();
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      // 未登录 && 当前不属于登录页面
      // 前往登录页面
      window.location.pathname = '/login';
    }
  }, []);

  // 真正的切换主题操作
  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  return (
    <BrowserRouter>
      {/* Arco Design 提供的全局配置层，一次设置，全局生效 */}
      <ConfigProvider
        // 配置语言包
        locale={getArcoLocale()}
        // 组件配置
        componentConfig={{
          Card: {
            bordered: false,
          },
          List: {
            bordered: false,
          },
          Table: {
            border: false,
          },
        }}
      >
        {/* redux 层的全局 Provider */}
        <Provider store={store}>
          {/* 应用级的上下文 Provider，修改全局的语言、主题设置  */}
          <GlobalContext.Provider value={contextValue}>
            {/* 根级路由配置 */}
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={PageLayout} />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
