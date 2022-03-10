<template>
  <Modal>
    <template #modal-content-top class="form">
      <input type="hidden" id="drafter" :value=document.document.drafted_user_id />
      <input type="hidden" id="reviewer" :value=document.document.reviewed_user_id />
      <input type="hidden" id="reviewed_status" :value="document.document.reviewed_status">
      <input type="hidden" id="approval_status" :value="document.document.approval_status">
      <div class="b-1">
        <div id="test" class="form-head d-flex space-between mb-2">
          <div class="form-title f-24 font-700 p-20 t-center w-65" style="padding-top:40px;">단말기 임대 품의서</div>
          <div class="form-approval-wrap d-flex">
            <div class="form-approval-title b-1 f-12 bg-gray font-700 p-20">결재</div>
            <div class="form-approval-lines">
                <div class="form-approval-line d-flex">
                    <div class="approval approval-writer b-1">
                        <div class="title bb-1 p-5 f-12 font-700">기안자</div>
                        <div id="drafterId-before" class="approval-sign p-5">{{document.drafted_user_name}}</div>
                    </div>
                    <div class="approval approval-reviewed b-1">
                        <div class="title bb-1 p-5 f-12 font-700">검토자</div>
                        <div id="" class="approval-sign p-2">
                          <div id="approvalId-before" class="approval-sign p-5 d-none">{{document.reviewed_user_name}}</div>
                          <select name="" id="approvalIdSelect" class="d-none" style="border-style:none;">
                            <option value="김진민">김진민</option>
                            <option value="임건호">임건호</option>
                          </select>
                        </div>
                    </div>
                    <div class="approval approval-okuser b-1">
                        <div class="title bb-1 p-5 f-12 font-700">결재자</div>
                        <div id="okUserId-before" class="approval-sign p-5">{{document.approval_user_name}}</div>
                    </div>
                </div>
                <div class="form-approval-line d-flex">
                    <div class="approval approval-writer b-1">
                      <div class="title bb-1 p-5 f-12 font-700">기안자</div>
                      <div id="drafterId-after" class="approval-sign p-5">승인</div>
                    </div>
                    <div class="approval approval-reviewed b-1">
                      <div class="title bb-1 p-5 f-12 font-700">검토자</div>
                      <div id="approvalId-after" class="approval-sign p-5">{{document.document.reviewed_status}}</div>
                    </div>
                    <div class="approval approval-okuser b-1">
                      <div class="title bb-1 p-5 f-12 font-700">결재자</div>
                      <div id="okUserId-after" class="approval-sign p-5">{{document.document.approval_status}}</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="form-body">
          <table class="form f-14 w-100">
            <tr>
              <td class="table-title">일련번호</td>
              <td>{{document.document.serialnum}}</td>
              <td class="table-title">작성일</td>
              <td>{{utcToKst(document.document.requestdate)}}</td>
            </tr>
            <tr class="space"></tr>
            <tr>
              <td class="table-title">단말기</td>
              <td colspan="3">{{}}</td>
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
                  <input type="text" name="rentStartDate" id="rentStartDate" class="w-100" tabindex="3" :value="document.rentaldate">
              </td>
            </tr>
            <tr>
              <td class="table-title"></td>
              <td colspan="3">
                <div class="t-left f-12">
                  <p class="font-700 mb-2">- 임대 기본 규정</p>
                      <p class="t-2em mb-2">- 대여기간 1개월 (휴일 포함, 연장 최대 달)</p>
                      <p class="t-2em mb-2">- 대여기간 연장은 대기 수요가 없는 상황에 한함</p>
                      <p class="t-2em mb-2">- 반납 지연 , 연체일 상당 일자 만큼 재대여 불가</p>
                      <p class="t-2em mb-2">- 고장 및 분실 시 해당 단말기 배상</p>
                      <p class="t-4em mb-2">- 충전기 등 소모성 자체는 미포함</p>
                      <p class="t-2em red mb-2">- 1회 / 최대 5대 임개 가능 (다른 단말기 필요 시, 반납 후 재 임대 필dy)</p>
                </div>
                <textarea name="memo" id="memo" cols="30" rows="10" class="w-100" tabindex="4" :value="document.document.reason_for_rejection"></textarea>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </template>
    <template #modal-content-bottom>
      <div id="regular" class="form-btn-grp mt-50 d-none">
          <button class="cancel-btn mr-5" v-on:click="toggleModal('approval', 0)">취소</button>
          <button class="active-btn">등록</button>
      </div>
      <div id="statusBtn" v-bind:class="[{'form-btn-grp mt-50 d-none' : document.document.drafted_user_id == this.$cookies.get('user_id')},{'form-btn-grp mt-50 d-none' : (document.document.reviewed_user_id == this.$cookies.get('user_id') && (document.document.reviewed_status == '승인' || document.document.reviewed_status == '반려'))},{'form-btn-grp mt-50 d-none' : (document.document.approval_user_id == this.$cookies.get('user_id') && (document.document.approval_status == '승인' || document.document.approval_status == '반려'))}]">
          <button id="extensionBtn" v-bind:class="[{'d-none' : (document.document.approval_status != '승인' && document.document.drafted_user_id != this.$cookies.get('user_id'))}, {'actvie_btn':(document.document.approval_status == '승인' && document.document.drafted_user_id == this.$cookies.get('user_id'))}]" v-on:click="extendRent(document.document)">연장하기</button>
          <!-- <div v-bind:class="[{'p-20 menu d-none': role <= 1}, {'p-20 menu cursor': role >= 2}]">  -->
          <button id="rejectBtn" class="cancel-btn mr-5" v-on:click="updateStatus(document.document.document_id, '반려')">반려</button>
          <button id="confirmBtn" class="active-btn" v-on:click="updateStatus(document.document.document_id, '승인')">승인</button>
      </div>
    </template>
  </Modal>
  {{this.$cookies.get('user_dept')}}
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
  computed() {
    // if(this.$cookies.get("user_id")=== drafter) btn.classList.add("d-none")
    // else if(this.$cookies.get("user_id") == reviewer && (reviewed_status == '승인' || reviewed_status == '반려')) btn.classList.add("d-none")
    // else if(this.$cookies.get("user_id") == approval && (approval_status == '승인' || approval_status == '반려')) btn.classList.add("d-none")
  },
  components: {
    Modal
  }
  ,
  props: {
    document: Object
  },
  methods: {
    toggleModal (category, type) {
      this.$toggleModal(category, type)
    },

    updateStatus(doc_id, status) {
      this.axios
        .put(`/document/update/${this.$cookies.get("user_id")}/${doc_id}/${status}`)
        .then((res) => {
          if(res.status == 200) {
            document.getElementById("statusBtn").classList.add('d-none')
          }
        })
        .catch((error) => {
            alert("잠시 후 다시 시도해주세요.")
        })
    },
    
    extendRent(document) {
      //console.log(document.document_id)
      this.axios
        .get(`/item/extend/${document.document_id}`)
        .then((res) => {
          if(res.status == 200) {
            let tmp_list = []
            for(let i = 0; i < res.data.length; i++) {
              tmp_list.push(res.data[i].item_id)
            }
            //this.toggleModal('approval',0)
          }
          console.log(res.data)
          this.docs = res.data
        }).catch((res) => {
            console.log(res)
        })
    },
    utcToKst(data){
      const kst = moment(data,"YYYY-MM-DDTHH:mm:ssZ")
      const result = kst["_d"];
      return moment(result).format('YYYY-MM-DD')
    }
  }
}
</script>
