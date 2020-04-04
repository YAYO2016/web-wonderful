/**
 * Created by yanyue on 2020/3/30 22:48
 */
import Http from '@/api/config/http.js';

const post = Http.post;
const get = Http.get;

const commonApi = {
    //文件上传
    fileUpload(params) {
        return post('/users/register', params)
    },


};

export default commonApi;
