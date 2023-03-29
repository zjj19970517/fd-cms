import React, { useEffect } from 'react';

// components
import Footer from '@/components/Footer';
import LoginForm from './form';
import LoginBanner from './banner';

// assets
import Logo from '@/assets/logo.svg';

// styles
import styles from './style/index.module.less';

/**
 * @page 登录页面
 * @returns
 */
function Login() {
  useEffect(() => {
    // 登录页面只设置 light 主题风格
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
        <div className={styles['logo-text']}>Arco Design Pro</div>
      </div>
      <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <LoginBanner />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
Login.displayName = 'LoginPage';

export default Login;
