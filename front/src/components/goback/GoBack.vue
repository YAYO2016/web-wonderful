<template>
    <div class="GoBack">
        <span @click="goBack">
            <i class="el-icon-arrow-left"></i>返回
        </span>
    </div>
</template>

<script>
    export default {
        name: "GoBack",
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .GoBack {
        font-size: 12px;
        height: 24px;
        color: #7a859a;
        line-height: 24px;
        margin-bottom: 10px;
    }

    .GoBack span {
        cursor: pointer;
    }
</style>
