/**
 * Created by yanyue on 2019-09-18 14:51
 */

import homeApi from './interfaces/homeApi';
import userApi from './interfaces/userApi';

const api = {
    ...userApi,
    ...homeApi
};

export default api;
