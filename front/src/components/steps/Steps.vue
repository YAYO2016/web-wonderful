<template>
    <ul class='Steps' v-if="allsteps && allsteps.length>0">
        <li
                :class="(step.active)?'active':''"
                v-for="(step,index) in allsteps"
                :key="index"
        >{{`${index+1}.${step.title}`}}
        </li>
    </ul>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/13 17:59
     */

    export default {
        name: "Steps",
        props: {
            allsteps: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
    .Steps {
        position: relative;
        margin-bottom: 30px;
        counter-reset: step; /*创建步骤数字计数器*/
    }

    /*步骤描述*/
    .Steps li {
        list-style-type: none;
        font-size: 12px;
        text-align: center;
        width: 15%;
        position: relative;
        float: left;
    }

    /*步骤数字*/
    .Steps li:before {
        display: block;
        content: counter(step); /*设定计数器内容*/
        counter-increment: step; /*计数器值递增*/
        width: 16px;
        height: 16px;
        background-color: #ff7900;
        line-height: 32px;
        border-radius: 32px;
        font-size: 0px;
        color: #fff;
        text-align: center;
        font-weight: 700;
        margin: 0 auto 8px auto;
    }

    /*连接线*/
    .Steps li ~ li:after {
        content: '';
        width: 100%;
        height: 2px;
        background-color: #ff7900;
        position: absolute;
        left: -50%;
        top: 15px;
        z-index: -1; /*放置在数字后面*/
    }

    /*将当前/完成步骤之前的数字及连接线变绿*/
    .Steps li.active:before,
    .Steps li.active:after {
        background-color: #ff7900;
    }

    /*将当前/完成步骤之后的数字及连接线变灰*/
    .Steps li.active ~ li:before,
    .Steps li.active ~ li:after {
        background-color: #777;
    }


</style>
