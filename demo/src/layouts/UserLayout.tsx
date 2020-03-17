import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import { Link } from 'umi';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import SelectLang from '@/components/SelectLang';
import { ConnectProps, ConnectState } from '@/models/connect';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  const links = [
    {
      key: 'fastersoft',
      title: '东华发思特',
      href: 'http://www.fastersoft.com.cn/',
      blankTarget: true,
    },
    {
      key: 'donghua',
      title: '东华软件',
      href: 'http://www.dhcc.com.cn/',
      blankTarget: true,
    },
  ];

  const copyright = 'Fastersoft';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>开发综合管理平台</span>
              </Link>
            </div>
            <div className={styles.desc}>东华发思特 - 农业农村事业部</div>
          </div>
          {children}
        </div>
        <DefaultFooter links={links} copyright={copyright} />
      </div>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
