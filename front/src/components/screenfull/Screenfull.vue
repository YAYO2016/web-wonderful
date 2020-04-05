<template>
    <div class='Screenfull'>
        <i :class="isFullscreen?'el-icon-bangzhu':'el-icon-rank'" @click="click"></i>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/16 22:43
     * 实现网页全屏切换的组件
     */
    import screenfull from 'screenfull'

    export default {
        name: "Screenfull",
        data() {
            return {
                isFullscreen: false
            }
        },
        mounted() {
            this.init()
        },
        beforeDestroy() {
            this.destroy()
        },
        methods: {
            click() {
                if (!screenfull.enabled) {
                    this.$message({
                        message: 'you browser can not work',
                        type: 'warning'
                    })
                    return false
                }
                screenfull.toggle()
            },
            change() {
                this.isFullscreen = screenfull.isFullscreen
            },
            init() {
                if (screenfull.enabled) {
                    screenfull.on('change', this.change)
                }
            },
            destroy() {
                if (screenfull.enabled) {
                    screenfull.off('change', this.change)
                }
            }
        }
    }
</script>

<style scoped>
    .Screenfull i {
        cursor: pointer;
        fill: #5a5e66;
    }

</style>
