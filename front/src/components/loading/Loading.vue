<template>
    <div class='Loading'>
        <div class="loading">
            <img src="@/assets/imgs/loading.gif" alt="">
        </div>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-10-25 22:01
     */

    export default {
        name: "Loading",
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .Loading {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 121;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        display: table-cell;
        vertical-align: middle;
        text-align: center;

        img {
            width: 1rem;
            height: 1rem;
            margin: 7.5rem auto;
        }
    }
</style>
