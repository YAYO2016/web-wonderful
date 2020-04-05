<template>
    <el-autocomplete class="inline-input AutoComplete"
                     v-model="data[valueKey.split(',')[searchValueIndex]]"
                     :fetch-suggestions="(queryString,cb)=>{querySearchFunction(queryString,cb);flag=false}"
                     :placeholder="placeholder"
                     @select="(item=>{handleSelectItemFunction(item,valueKey,data,flag)})"
                     clearable
                     @clear="()=>{valueKey.split(',').forEach(key=>{data[key.reploace('(No)','')]=''})}"
                     :style="{width:width}"
                     :popper-class="longItems=='big'?'select-autocomplete-option-big':''"
                     @blur="()=>{flag?'':valueKey.split(',').forEach(key=>{data[key.replace('(No)','')]})}"
    >
        <i slot="prefix" class="icon icon-search-btn-grey"></i>
        <template slot-scope="{item}">
            <div class="name" disabled :style="item.name='查无数据'?'text-align:center':''">
                {{item.name && item.name === '查无数据'?'查无数据':messageItems(item,valueKey)}}
            </div>
        </template>
    </el-autocomplete>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/2 13:39
     */

    export default {
        name: "AutoComplete",
        props: {
            searchValueIndex: {
                type: Number,
                default: 0
            },
            placeholder: {
                type: String,
                default: "下拉选择，可模糊查询"
            },
            data: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            querySearchFunction: {
                type: Function,
                default: () => {

                }
            },
            handleSelectItem: {
                type: Boolean,
                default: false
            },
            handleSelectItemFunction: {
                type: Function,
                default: (item, valueKey, data, flag) => {
                    valueKey.split(",").forEach(value => {
                        data[value.replace("(No)", "")] = item[value.replace("(No)", "")]
                    });
                    flag = true;
                }
            },
            width: {
                type: String,
                default: "260px"
            },
            longItems: {
                type: String,
                default: ""
            },
            valueKey: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }

        },
        data() {
            return {
                flag: false
            }
        },
        methods: {
            messageItems(item, valueKey) {
                let message = "";
                valueKey.split(",").forEach((key, index) => {
                    if (key.indexOf("(No)") === -1 && index === 0) {
                        message += `${item[key]}`;
                    } else if (key.indexOf("(No)") === -1 && index === 1) {
                        message += `${item[key]}`;
                    }
                });
                return message;
            }
        }
    }
</script>

<style lang='scss' scoped>
    .AutoComplete {
        .icon {
            font-size: 16px;
            line-height: 32px;
        }
    }
</style>
