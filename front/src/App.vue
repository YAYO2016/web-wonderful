<template>
    <div id="app">
        <!--通过v-if来控制容器的出现与消失-->
        <router-view v-if="isRouterAlive"/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        //全局中定义了刷新的方法,该刷新方法不会让页面出现闪烁的效果
        provide(){
            return {
                reload:this.reload
            }
        },
        data(){
            return{
                isRouterAlive: true
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;
                this.$nextTick(() => (this.isRouterAlive = true))
            }
        }
    }
</script>

<style lang="scss">
    #app {
        height: 100vh;
    }
</style>
