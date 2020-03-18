import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { fakeRegister } from './service';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
  errors?: any;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
    errorsHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndregister',

  state: {
    status: undefined,
    errors: {},
  },

  effects: {
    *submit({ payload }, { call, put }) {
      try {
        const response = yield call(fakeRegister, payload);
        yield put({
          type: 'registerHandle',
          payload: response,
        });
        //捕获异常
      } catch (e) {
        yield put({
          type: 'registerHandle',
          payload: e.data, //捕获后端的错误信息
        });
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
    errorsHandle(state, { payload }) {
      return {
        ...state,
        errors: payload,
      };
    },
  },
};

export default Model;
