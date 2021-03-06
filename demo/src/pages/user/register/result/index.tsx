import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Button, Result } from 'antd';
import { Link } from 'umi';
import React from 'react';
import { RouteChildrenProps } from 'react-router';

import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        <FormattedMessage id="userandregisterandresult.register-result.view-mailbox" />
      </Button>
    </a>
    <Link to="/">
      <Button size="large">
        <FormattedMessage id="userandregisterandresult.register-result.back-home" />
      </Button>
    </Link>
  </div>
);

const Results: React.FC<RouteChildrenProps> = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="userandregisterandresult.register-result.msg"
          values={{ email: location.state ? location.state.account : 'AntDesign@example.com' }}
        />
      </div>
    }
    subTitle={formatMessage({ id: 'userandregisterandresult.register-result.activation-email' })}
    extra={actions}
  />
);

export default Results;
