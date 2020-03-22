/**
 * Created by yanyue on 2019-09-18 17:10
 * 用户相关的接口请求
 */
import Http from '@/api/config/http.js';

const post = Http.post;
const get = Http.get;

const userApi = {
    //注册接口
    register(params) {
        return post('/users/register', params)
    },
    login(params) {
        return post('/users/login', params)
    },
    getUsers(params) {
        return get('/users/getUsers', params,{loading:true})
    },

};

export default userApi;
