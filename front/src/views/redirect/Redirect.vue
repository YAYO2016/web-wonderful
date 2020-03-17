<script>
    //只是实现路由跳转的功能
    export default {
        created() {
            const { params, query } = this.$route
            const { path } = params
            this.$router.replace({ path: '/' + path, query })
        },
        render: function(h) {
            return h() // avoid warning message
        }
    }
</script>
