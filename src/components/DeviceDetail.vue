<template>
<Modal>
    <template #modal-content-top class="form">
        <div class="b-1">
            <!-- <div v-for="s in selected" v-bind:key="s">{{s}}</div> -->
        <div class="form-head d-flex space-between mb-2">
            <div class="form-title f-24 font-700 p-20 t-center w-65" style="padding-top:40px;">단말기 임대 품의서</div>
            <div class="form-approval-wrap d-flex">
            <div class="form-approval-title b-1 f-12 bg-gray font-700 p-20">결재</div>
            <div class="form-approval-lines">
                <div class="form-approval-line d-flex">
                    <div class="approval approval-writer b-1">
                        <div class="title bb-1 p-5 f-12 font-700">품의자</div>
                        <div id="drafterlId-before" class="approval-sign p-5">박정화</div>
                    </div>
                    <div class="approval approval-reviewed b-1">
                        <div class="title bb-1 p-5 f-12 font-700">검토자</div>
                        <div id="" class="approval-sign p-2">
                            <div id="approvalId-before" class="approval-sign p-5 d-none">김진민</div>
                            <select name="" id="approvalIdSelect" class="d-none" style="border-style:none;">
                            <option value="김진민">김진민</option>
                            <option value="임건호">임건호</option>
                            </select>
                        </div>
                    </div>
                    <div class="approval approval-okuser b-1">
                        <div class="title bb-1 p-5 f-12 font-700">결재자</div>
                        <div id="okUserId-before" class="approval-sign p-5"></div>
                    </div>
                </div>
                <div class="form-approval-line d-flex">
                    <div class="approval approval-writer b-1">
                        <div class="title bb-1 p-5 f-12 font-700">품의자</div>
                        <div id="drafterId-after" class="approval-sign p-5">박정화</div>
                    </div>
                    <div class="approval approval-reviewed b-1">
                        <div class="title bb-1 p-5 f-12 font-700">검토자</div>
                        <div id="approvalId-after" class="approval-sign p-5">박정화</div>
                    </div>
                    <div class="approval approval-okuser b-1">
                        <div class="title bb-1 p-5 f-12 font-700">결재자</div>
                        <div id="okUserId-after" class="approval-sign p-5">박정화</div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div class="form-body">
            <table class="form f-14 w-100">
            <tr>
                <td class="table-title">일련번호</td>
                <td>티시스-IT사업본부-A072</td>
                <td class="table-title">작성일</td>
                <td>2022/03/01</td>
            </tr>
            <tr class="space"></tr>
            <tr>
                <td class="table-title">단말기</td>
                <td colspan="3" name ="device" id ="deviceID" > {{this.selected[0]["name"]}}</td>
                <!-- <td colspan="3" name ="device" id ="deviceID"> {{this.selected[0].length}}</td> -->

            </tr>
            <tr>
                <td rowspan="3" class="table-title">임대정보</td>
                <td class="table-title">관리자</td>
                <td colspan="2">
                    <input type="text" name="deviceUser" id="deviceUser" class="w-100" tabindex="1" autofocus>
                </td>
            </tr>
            <tr>
                <td class="table-title">부서</td>
                <td colspan="2">
                <input type="text" name="userDept" id="userDept" class="w-100" tabindex="2">
                </td>
            </tr>
            <tr>
                <td class="table-title">임대시작일</td>
                <td colspan="2">
                    <input type="text" name="rentStartDate" id="rentStartDate" class="w-100" tabindex="3">
                </td>
            </tr>
            <tr>
                <td class="table-title"></td>
                <td colspan="3">
                <div class="t-left f-12">
                    <p class="font-700 mb-2">- 임대 기본 규정</p>
                        <p class="t-2em mb-2">- 대여기간 1개월 (휴일 포함, 연장 최대 달)</p>
                        <p class="t-2em mb-2">- 대여기간 연장은 대기 수요가 없는 상황에 한함</p>
                        <P class="t-2em mb-2">- 반납 지연 , 연체일 상당 일자 만큼 재대여 불가</P>
                        <P class="t-2em mb-2">- 고장 및 분실 시 해당 단말기 배상</P>
                        <P class="t-4em mb-2">- 충전기 등 소모성 자체는 미포함</p>
                        <p class="t-2em red mb-2">- 1회 / 최대 5대 임개 가능 (다른 단말기 필요 시, 반납 후 재 임대 필dy)</p>
                </div>
                <textarea name="memo" id="memo" cols="30" rows="10" class="w-100" tabindex="4"></textarea>
                </td>
            </tr>
            </table>
        </div>
        </div>
    </template>
    <template #modal-content-bottom>
        <div class="document-wrap b-1 w-100 mt-15">
            <img src="@/assets/img/rental_agreement.jpg" class="w-100" alt="">
        </div>
        <div id="regular" class="form-btn-grp mt-50 d-none">
            <button class="cancel-btn mr-5" v-on:click="toggleModal('approval', 0)">취소</button>
            <button class="active-btn">등록</button>
        </div>
        <div id="extension" class="form-btn-grp mt-50 d-none">
            <button id="extensionBtn" class="active-btn" v-on:click="toggleModal('approval',1)">연장하기</button>
        </div>
    </template>
</Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  name: 'DeviceDetail',
  components: {
    Modal
  }, 
  methods: {
    toggleModal (category, type) {
      this.$toggleModal(category, type)
    },
  },
  props: {
      selected : Array
  },
  created() {
      console.log("modalCreated : "+this.list)
  },
}
</script>
