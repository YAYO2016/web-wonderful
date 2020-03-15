<template>
    <div class='Tabs'>
        <el-tag
                :key="tag.name"
                size="small"
                v-for="tag in tags"
                :closable="tag.name !== 'Home'"
                :disable-transitions="false"
                @close="handleClose(tag)"
                @click="changeMenu(tag)"
                :effect="$route.name === tag.name ? 'dark' : 'plain'"
        >
            <!--:closable="tag.meta.name !== 'Home'"  首页不给关闭-->
            {{ tag.meta.title }}
        </el-tag>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/15 22:32
     */
    import {mapState, mapMutations, mapActions} from 'vuex'

    export default {
        name: "Tabs",
        data() {
            return {}
        },
        computed: {
            ...mapState({
                tags: state => state.common.tabsList
            })
        },
        methods: {
            handleClose(tag) {
                let vm = this;
                vm.$store.dispatch("common/closeTab",tag);
            },
            changeMenu(item) {
                let vm = this;
                vm.$router.push({name: item.name});
            }
        }
    }
</script>

<style lang='scss' scoped>
    .Tabs {
        padding: 20px;

        .el-tag {
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>
