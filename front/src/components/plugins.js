/**
 * Created by yanyue on 2019-09-25 20:48
 */

import GDialog from './dialog/GDialog';
import GECharts from './echarts/ECharts';
import GSplitLevel from './split/SplitLevel';
import GSplitVertical from './split/SplitVertical';
import GUploadFile from './uploadfile/UploadFile'
import GTable from './table/Table'
import GPagination from './pagination/Pagination'
import GAutoComplete from './auto-complete/AutoComplete'
import GAreaSelect from './areaslect/AreaSelect'
//import GAllCheckbox from './selectAll-checkbox/AllCheckbox'
import GSteps from './steps/Steps'
import GDateRange from './date/GDateRange'
import GInputView from './form/InputView'
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
        //Vue.component('g-all-checkbox',GAllCheckbox);
        Vue.component('g-steps',GSteps);
        Vue.component('g-date-range',GDateRange);
        Vue.component('g-input-view',GInputView);
    }
};
