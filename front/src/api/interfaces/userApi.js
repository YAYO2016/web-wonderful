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
    getUserInfo(params){
        return post('/users/getUserInfo', params)
    },
    getUsers(params) {
        return post('/users/getUsers', params,{loading:true})
    },
    getSingleUser(params) {
        return get('/users/getSingleUser', params)
    },

};

export default userApi;
