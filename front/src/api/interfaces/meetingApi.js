/**
 * Created by yanyue on 2020/4/9 19:16
 */
import Http from '@/api/config/http.js';

const post = Http.post;
const get = Http.get;

const meetingApi = {
    addMeeting(params) {
        return post('/meeting/addMeeting', params)
    },
    getMeetings(params) {
        return get('/meeting/getMeetings', params)
    },
    editMeeting(params) {
        return post('/meeting/editMeeting', params, {loading: true})
    },


};

export default meetingApi;
