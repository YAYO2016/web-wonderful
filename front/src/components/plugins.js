/**
 * Created by yanyue on 2019-09-25 20:48
 */

import GDialog from './dialog/Dialog';
import GECharts from './echarts/ECharts';
import GSplitLevel from './split/SplitLevel';
import GSplitVertical from './split/SplitVertical';
import GUploadFile from './uploadfile/UploadFile'
import GTable from './table/Table'
import GPagination from './pagination/Pagination'
import GAutoComplete from './auto-complete/AutoComplete'
import GAreaSelect from './areaslect/AreaSelect'
export default {
    install(Vue, options) {
        Vue.component('g-dialog', GDialog);
        Vue.component('g-split-l', GSplitLevel);
        Vue.component('g-split-v', GSplitVertical);
        Vue.component('g-upload-file',GUploadFile);
        Vue.component('g-echarts',GECharts);
        Vue.component('g-table',GTable);
        Vue.component('g-pagination',GPagination);
        Vue.component('g-areaSelect',GAreaSelect);
        Vue.component('g-auto-complete',GAutoComplete);
    }
};
