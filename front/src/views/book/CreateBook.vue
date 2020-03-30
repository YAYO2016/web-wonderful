<template>
    <div class='CreateBook'>
        <UploadBooks></UploadBooks>
        <g-split></g-split>
        <g-upload-file></g-upload-file>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/25 20:35
     */
    import UploadBooks from "./components/UploadBooks"

    export default {
        name: "CreateBook",
        components:{UploadBooks},
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .CreateBook {
        @include content-box;
    }
</style>
