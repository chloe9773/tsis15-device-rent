<template>
  <Modal>
    <template #modal-content-top class="form">
        <input type="hidden" id="item_id" :value="this.item.item_id" />
        <div class="modal-content d-flex space-between mb-30">
            <div class="modal-device-img b-1 w-50">
                <img class="device-picture" src="">
                <input type="file" class="" />
            </div>
            <div class="modal-device-info f-13 w-40 t-left">
                <div class="item-wrap">
                    <label class="font-700 mr-5">시리얼 넘버 : </label>
                    <input type="text" class="modal-inputbox" :value="this.item.serialnum" readonly>
                </div>
                <div class="item-wrap">
                    <label class="font-700 mr-5">종류 : </label>
                    <input type="text" class="modal-inputbox" :value="this.item.category" readonly>
                </div>
                <div class="item-wrap">
                    <label class="font-700 mr-5">브랜드 : </label>
                    <input type="text" class="modal-inputbox" :value="this.item.brand" readonly>
                </div>
                <div class="item-wrap">
                    <label class="font-700 mr-5">OS : </label>
                    <input type="text" class="modal-inputbox" :value="this.item.os" readonly>
                </div>
                <div class="item-wrap">
                    <label class="font-700 mr-5">단말기명 : </label>
                    <input type="text" class="modal-inputbox" :value="this.item.name" readonly>
                </div>
                <div class="item-wrap">
                    <label class="font-700 mr-5">가격 : </label>
                    <input type="text" class="modal-inputbox" :value="this.item.price" readonly>
                </div>
                <div class="item-wrap">
                    <label class="font-700 mr-5">구매처 : </label>
                    <a href="https:www.naver.com" class="underline" target="_blank">사이트로 바로 이동</a>
                    <!-- <a v-bind:href="this.item.link" target="_blank">사이트로 바로 이동</a> -->
                </div>
                <div class="item-wrap">
                    <label class="font-700 mr-5">상태 : </label>
                    <input type="text" class="modal-inputbox" :value="this.item.status" readonly>
                </div>
                <div class="item-wrap">
                    <label class="font-700 mr-5">메모 : </label>
                    <input type="text" class="modal-inputbox" :value="this.item.memo" readonly>
                </div>
            </div>
        </div>
    </template>
    <template #modal-content-bottom>
        <div class="device-status-list">
                <div class="table-wrap">
                    <table>
                        <thead class="f-14 font-700 bb-2 bt-2">
                            <th class="v-middle">임대시작일</th>
                            <th class="v-middle">부서</th>
                            <th class="v-middle">관리</th>
                            <th class="v-middle">임대종료일</th>
                            <th class="v-middle">부서</th>
                            <th class="v-middle">관리</th>
                        </thead>
                        <tbody class="f-13 t-center">
                            <tr v-for="log in loglist" :key="log" class="bb-1">
                                <td class="w-15">{{log.rental_date}}</td>
                                <td>{{log.rental_date}}</td>
                                <td class="w-10">{{log.name}}</td>
                                <td class="w-15">{{log.return_date}}</td>
                                <td>{{log.rental_date}}</td>
                                <td class="w-10">{{log.checker_name}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    </template>
</Modal>
</template>

<script>
  import Modal from '@/components/Modal.vue'

  export default {
    created() {
        this.axios
            .get('/item/logpaging/1/1')
            .then((res) => {
                this.loglist = res.data.list
            }).catch((res) => {
                console.log(res)
            })
    },
    mounted() {
      this.toggleModal('device', 0)
    },
    components: {
      Modal
    },
    data() {
        return {
            loglist: {}
        }
    },
    methods:{
      toggleModal (category, type) {
        this.$toggleModal(category, type)
      },
    },
    props: {
      item : Object
    }
  }
</script>