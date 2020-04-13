<template>
    <el-steps class='Steps'
              v-if="allsteps && allsteps.length>0"
              :active="active"
              space="120px"
    >
        <!--space 每个 step 的间距，不填写将自适应间距。支持百分比。-->
        <el-step
                v-for="(step,index) in allsteps"
                :key="index"
        >
            <div slot="title">{{`${index+1}.${step.title}`}}</div>
            <div slot="icon">
                <i v-if="stepStatus(index) === 'noFinish'"
                   class="iconfont icon-yk_yuanquan_fill"></i>
                <i v-if="stepStatus(index) === 'finishing'"
                   class="iconfont icon-yk_yuanquan"
                   style="font-size: 23px;font-weight: 900;display: block;
                   color: #409EFF"></i>
                <i v-if="stepStatus(index) === 'finished'"
                   class="iconfont icon-yk_yuanquan_fill"></i>
            </div>
            <div style="margin-left: 5px" slot="description" v-if="step.desc" v-html="step.desc"></div>
        </el-step>
    </el-steps>
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
        computed: {
            active() {
                let resultIndex = 0;
                if (this.allsteps && this.allsteps.length) {
                    this.allsteps.forEach((step, index) => {
                        if (step.active) {
                            resultIndex = index;
                        }
                    })
                }
                return resultIndex;
            }
        },
        methods: {
            stepStatus(index) {
                if (index > this.active) {
                    // 未进行
                    return "noFinish"
                } else if (index === this.active) {
                    return "finishing"
                } else {
                    return "finished"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .Steps {
        /deep/ .el-step__icon.is-text {
            width: 16px;
            border: none;
        }

        /deep/ .el-step__title {
            font-size: 12px;
            color: #000;
        }

        /deep/ .el-step__description{
            font-size: 12px;
            color: #000;
        }
    }


</style>
