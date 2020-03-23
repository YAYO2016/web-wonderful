<template>
    <div class="Dialog">
        <el-dialog
                :title="title"
                :visible.sync="visible"
                @close="$emit('update:show', false)"
                @closed="closedDialog"
                @open="openDialog"
                :show="show"
                :width="width"
                :modal-append-to-body='false'
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :append-to-body="appendToBody"
        >
            <slot></slot>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'BackDialog',
        props: {
            title: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: "700px"
            },
            show: {
                type: Boolean,
                default: false
            },
            appendToBody: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: this.show
            }
        },
        mounted() {

        },
        watch: {
            show() {
                this.visible = this.show;
            }
        },
        methods: {
            closedDialog() {
                let vm = this;
                vm.$emit('closedDialog');
            },
            openDialog() {
                let vm = this;
                vm.$emit('openDialog');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .Dialog {
        /deep/ .el-dialog {
            border-radius: 5px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: 0 !important;
            transform: translate(-50%, -50%);
            max-height: calc(100% - 30px);
            max-width: calc(100% - 30px);
            display: flex;
            flex-direction: column;

            .el-dialog__header {
                border-radius: 5px 5px 0 0;
                background-color: #EEEEEE;
                height: 30px;
                font-size: 14px;
                padding: 0;
                line-height: 30px;
                text-align: left;

                .el-dialog__title {
                    font-size: 14px;
                    padding-left: 14px;
                }

                .el-dialog__headerbtn {
                    top: 7px;
                }
            }

            .el-dialog__body {
                text-align: left;
                /*padding: 5px 17px 5px 5px;*/
                padding:20px;
                max-height: 900px;
                overflow-y: auto;

                .back-table {
                    margin-top: 15px;
                }

                /deep/ .dialog-footer {
                    margin-top: 20px;
                    text-align: center;
                }

                textarea {
                    height: 100px;
                }
            }
        }
    }
</style>
