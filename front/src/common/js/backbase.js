import moment from 'moment';

const install = function (Vue, options) {

    Vue.prototype.sexFormat = (sex) => {
        if (sex === 'MALE') {
            return "男";
        } else if (sex === 'FEMALE') {
            return "女";
        } else {
            return "";
        }
    };

    Vue.prototype.rowSexFormat = (row, column) => {
        let sex = row[column.property];
        if (sex === 1) {
            return "男";
        } else if (sex === 0) {
            return "女";
        } else {
            return "";
        }
    };

    //备注格式处理
    Vue.prototype.remarkFormat = (row, column) => {
        let content = row[column.property];
        return content.replace(/\n/g, '<br/>');
    };

    Vue.prototype.timeFormat = (date) => {
        if ((!date && typeof (date) != "undefined" && date != 0) || date == '') {
            return '';
        } else {
            return moment(parseInt(date)).format("YYYY-MM-DD HH:mm:ss");
        }
    };

    Vue.prototype.dateFormat = (date) => {
        if ((!date && typeof (date) != "undefined" && date != 0) || date == '') {
            return '';
        } else {
            return moment(parseInt(date)).format("YYYY-MM-DD");
        }
    };

    Vue.prototype.hourFormat = (date) => {
        if ((!date && typeof (date) != "undefined" && date != 0) || date == '') {
            return '';
        } else {
            return moment(parseInt(date)).format("HH:mm:ss");
        }
    };

    Vue.prototype.rowDateFormat = (row, column) => {
        let date = row[column.property];
        if (!date && typeof (date) != "undefined" && date != 0) {
            return "";
        } else {
            return moment(parseInt(date)).format("YYYY-MM-DD");
        }
    };

    Vue.prototype.roleFormat = (roleArr) => {
        if (roleArr) {
            return roleArr.map(role => {
                return role.roleName
            }).join(',');
        } else {
            return ''
        }
    };

    Vue.prototype.rowItemRate = (row, column) => {
        let itemRate = row[column.property];
        return itemRate + "%";
    };

    Vue.prototype.rowItemNoPoint = (row, column) => {
        let itemNum = row[column.property];
        return itemNum.substring(0, itemNum.indexOf('.'));
    };

    Vue.prototype.validateRules = (formName, _this) => {
        let result = '';
        _this.$refs[formName].validate((valid) => {
            if (valid) {
                result = true;
            } else {
                _this.$message({
                    message: '输入有误',
                    type: 'error'
                });
                result = false;
            }
        });
        return result;
    };

};

export default install;
