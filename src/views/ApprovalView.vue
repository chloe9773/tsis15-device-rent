<!-- 결재문서함 -->
<template>
  <Modal>
    <template #modal-content-top class="form">
      <div class="b-1">
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
              <td colspan="3">iPhone 11 Pro Max</td>
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
  <MenuBar/>
  <div class="main-content-admin w-70 m-auto">
    <div class="table-title mb-10 d-flex space-between w-100">
      <div class="table-title-left f-12">
        <span id="articl-total" class="title-left-item">15</span>
        <span class=" title-left-item">개의 게시물이 있습니다.</span>
      </div>
      <div class="table-title-right" style="transform:translateY(20%);">
        <span class="f-14">내가 기안자인 문서만 보기</span>
        <input type="checkbox" name="" id="" class="">
      </div>
      </div>
      <div class="table-wrap">
          <table class="table request w-100 mb-10">
              <thead class="f-14 font-700 bb-l-2 bt-l-2" style="background-color:#e8e8e8">
                <th class="p-20"></th>
                <th class="v-middle">작성자</th>
                <th class="v-middle">제목</th>
                <th class="v-middle">작성일</th>
              </thead>
              <tbody class="f-13 t-center">
                <tr class="bb-1 cursor" v-on:click="toggleModal('approval',2)">
                  <td class="w-10"><div class="drafter">기안자</div></td>
                  <td class="w-15">박정화</td>
                  <td>단말기 대여 요청 협조문</td>
                  <td class="w-15">2022/02/27</td>
                </tr>
                <tr class="bb-1 cursor" v-on:click="toggleModal('approval',2)">
                  <td class="w-10"><div class="approver">검토자</div></td>
                  <td class="w-15">박정화</td>
                  <td>단말기 대여 요청 협조문</td>
                  <td class="w-15">2022/02/27</td>
                </tr>
              </tbody>
          </table>
      </div>
      <PageBtn />
      <div class="btn-wrap">
        <button class="cancel-btn float-r" v-on:click="toggleModal('approval', 1)">글쓰기</button>
      </div>
    </div>
</template>

<style scoped>
  .table-title-left, .form-title {
    display: table-cell;
    vertical-align: middle;
  }
  .title-left-item {
    position:relative;
    top:50%;
  }
  .request tr:hover {
    background-color: rgba(197, 197, 197, 0.2);
  }
  .request tr:not:first-child {
    border-bottom: 1px solid #c5c5c5;
  }
  /* .request tr:nth-child(2n) {
    background-color: #ededed;
  } */
  
  .form td {
      padding: 10px;
  }

  .form .approval {
      width: 65px;
      height:65px;
  }
  
  .form .approval-sign {
      line-height: 30px;
  }
    
  .form .table-title {
      font-weight: 700;
      background-color: #c5c5c5;
  }

  .form tr {
      border: 1px solid #c5c5c5;
  }

  .drafter, .approver {
    padding: 3px 6px;
    width: 30%;
    font-size: 10px;
    border-radius: 3px;
    color: #fff;
  }
  .drafter {
    border: 1px solid #c5c5c5;
    background-color: rgb(197, 197, 197);
  }
  .approver {
    border: 1px solid #ff0000;
    background-color: rgb(255, 0, 0);
  }

  .form {
    border-collapse: separate;
    border-spacing: 0px 1px;
  }

  .form td {
    border: 1px solid #c5c5c5;
  }
</style>

<script>
import MenuBar from '@/components/MenuBar.vue'
import Modal from '@/components/Modal.vue'
import PageBtn from '@/components/table/PageBtn.vue'

export default {
  name: 'ApprovalView',
  components: {
    MenuBar,
    Modal,
    PageBtn
  }, 
  methods: {
    toggleModal(category, type) {
      this.$toggleModal(category, type)
    }
    // toggleModal: function () {
    //   $("#modal-body").toggleClass("d-none");
    //   $("#modal").toggleClass("d-none");
    // }
  }
  // ,
  // methods: {
  //   this.$toggleModal()
  // }
}
</script>
