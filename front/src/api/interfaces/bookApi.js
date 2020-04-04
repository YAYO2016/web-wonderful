/**
 * Created by yanyue on 2019-09-18 17:10
 * 用户相关的接口请求
 */
import Http from '@/api/config/http.js';

const post = Http.post;
const get = Http.get;

const bookApi = {
    //注册接口
    createBook(params) {
        return post('/book/create', params, {loading: true})
    },

};

export default bookApi;
