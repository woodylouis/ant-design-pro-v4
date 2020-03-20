import React, { FC, useState, useEffect } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message
} from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import styles from './style.less';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { StateType } from './model';
import { router } from 'umi';

interface RegisterProps {
  dispatch: Dispatch<any>;
  userAndregister: StateType;
  submitting: boolean;
}
export interface UserRegisterParams {
  user: {
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
    phone: string;
    code: string;
  };
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



const RegistrationForm: FC<RegisterProps> = ({ submitting, dispatch, userAndregister }) => {
  const [form] = Form.useForm();
  const [count, setcount]: [number, any] = useState(0);
  let interval: number | undefined;
  useEffect(() => {
    if (!userAndregister) {
      return;
    }
    const account = form.getFieldValue('email');
    if (userAndregister.status === 'ok') {
      message.success('注册成功！');
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }, [userAndregister]);
  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);
  const onGetCaptcha = () => {
    let counts = 59;
    setcount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setcount(counts);
      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };
  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'userAndregister/submit',
      payload: { ...values },
    });
    console.log('Received values of form: ', values);
  };

  
 

  return (
    <div className={styles.custom_form}>
      <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item name="user[username]" label={<span>Username</span>}>
          <Input />
        </Form.Item>
        <Form.Item name="user[email]" label="E-mail">
          <Input />
        </Form.Item>

        <Form.Item name="user[password]" label="Password" hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="user[password_confirmation]"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="user[phone]" label="Phone Number">
          <Input
            // addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="user[code]" noStyle>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button onClick={onGetCaptcha}>
                {count
                  ? `${count}s`
                  : formatMessage({ id: 'userandregister.register.get-verification-code' })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button loading={submitting} type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(
  ({
    userAndregister,
    loading,
  }: {
    userAndregister: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndregister,
    submitting: loading.effects['userAndregister/submit'],
  }),
)(RegistrationForm);
