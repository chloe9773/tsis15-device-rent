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
                        <div id="drafterlId-before" class="approval-sign p-5">{{this.$cookies.get('user_name')}}</div>
                    </div>
                    <div class="approval approval-reviewed b-1">
                        <div class="title bb-1 p-5 f-12 font-700">검토자</div>
                        <div id="" class="approval-sign p-2">
                            <div id="approvalId-before" class="approval-sign p-5 d-none"></div>
                            <select name="" id="approvalIdSelect" class="d-none" style="border-style:none;">
                            <option  v-for="(reviewer,index) in this.reviewerlist.data" :value="reviewer.user_id" :key="index" >{{reviewer.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="approval approval-okuser b-1">
                        <div class="title bb-1 p-5 f-12 font-700">결재자</div>
                        <div id="okUserId-before" class="approval-sign p-5">관리자</div>
                    </div>
                </div>
                <div class="form-approval-line d-flex">
                    <div class="approval approval-writer b-1">
                        <div class="title bb-1 p-5 f-12 font-700">품의자</div>
                        <div id="drafterId-after" class="approval-sign p-5">승인</div>
                    </div>
                    <div class="approval approval-reviewed b-1">
                        <div class="title bb-1 p-5 f-12 font-700">검토자</div>
                        <div id="approvalId-after" class="approval-sign p-5"></div>
                    </div>
                    <div class="approval approval-okuser b-1">
                        <div class="title bb-1 p-5 f-12 font-700">결재자</div>
                        <div id="okUserId-after" class="approval-sign p-5"></div>
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
                <td>{{createToday}}</td>
            </tr>
            <tr class="space"></tr>
            <tr>
                <td class="table-title">단말기</td>
                <td colspan="3" name ="device" id ="deviceID" > <label v-for="(item,index) in selected" :key="index" class="itemname">{{item.name + ",  "}}</label></td>
            </tr>
            <tr>
                <td rowspan="3" class="table-title">임대정보</td>
                <td class="table-title">관리자</td>
                <td colspan="2">
                    <input type="text" v-model="deviceuser" name="deviceUser" id="deviceUser" class="w-100" tabindex="1" autofocus>
                </td>
            </tr>
            <tr>
                <td class="table-title">부서</td>
                <td colspan="2">
                <input type="text" v-model="userdept" name="userDept" id="userDept" class="w-100" tabindex="2">
                </td>
            </tr>
            <tr>
                <td class="table-title">임대시작일</td>
                <td colspan="2">
                    <input type="text" v-model="rentstartdate" name="rentStartDate" id="rentStartDate" class="w-100" tabindex="3" />
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
                <textarea v-model="memo" name="memo" id="memo" cols="30" rows="10" class="w-100" tabindex="4"></textarea>
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
            <button class="active-btn" v-on:click="approvalSubmit()">등록</button>
        </div>
        <div id="extension" class="form-btn-grp mt-50 d-none">
          <button id="extensionBtn" class="active-btn" v-on:click="extendPeriod('approval',2)">연장하기</button>
        </div>
    </template>
</Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  //검토자 불러오기
  created: function () {
    this.axios.get(`/user/reviewer/${this.$cookies.get('user_id')}`).then(res => {
      let reviewerlist = []
      this.reviewerlist=res
    }).catch(res => {
      console.log(res)
    })
  },
  computed : {
      createToday() {
        var today = new Date();

        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);

        var dateString = year + '-' + month  + '-' + day;

        return dateString
      }
  },
  name: 'DeviceDetail',
  components: {
    Modal
  }, 

  // 관리자명, 부서명, 임대시작일, 메모, device-list에서 select된 데이터 
  data : function() {
    return {
      deviceuser: '',
      userdept: '',
      rentstartdate: '',
      memo: '',
      ids: [],
      selectedlist: this.selected,
      item_id : this.selected,
      reviewerlist: {},
      selstatus: '',
      today: ''
      // 하드코딩
      // user_id: '28107771',
      // name: '황민재',
      // dept_name: '손보서비스팀',
      // reviewer_id: '28108683'
    }
  },
  methods: {
    toggleModal (category, type) {
      this.$toggleModal(category, type)
    },
    //연장하기 버튼 클릭
    extendPeriod: function() {
      let ids = []
      let approvalIdSelect = document.getElementById('approvalIdSelect')
      let optionvalue = approvalIdSelect.options[approvalIdSelect.selectedIndex].value
      for (let i = 0 ; i < this.selected.length ; i++) {
        let item_id = this.selected[i].item_id
        ids.push(
          item_id
        )
      }
      
      var url = `/document/save/${this.$cookies.get('user_id')}/${optionvalue}/티시스-IT사업본부-A072/${this.selstatus}` ;
      this.axios.post(url,ids)
      .then(function(res) {
        console.log("넘길 data 확인 : " + JSON.stringify(ids))
        alert("대여기한이 연장되었습니다")
        this.$router.go() // 페이지 새로고침
      })
      .catch(function() {
        console.error("에러//json형태 : " + JSON.stringify(ids) + "//url : " + url )
      })
    },

    

    //등록버튼클릭
    approvalSubmit: function() {
      let ids = []
      let approvalIdSelect = document.getElementById('approvalIdSelect')
      let optionvalue = approvalIdSelect.options[approvalIdSelect.selectedIndex].value
      
      for (let i = 0 ; i < this.selected.length ; i++) {
        let item_id = this.selected[i].item_id
        ids.push(
          item_id
        )
      }
      this.selstatus = this.selected[0].status
     
      var url = `/document/save/${this.$cookies.get('user_id')}/${optionvalue}/티시스-IT사업본부-A072/${this.selstatus}` ;
      // axios 전송
      this.axios.post(url,ids)
      .then((res) => {
        console.log("넘길 data 확인 : " + JSON.stringify(ids))
        alert("기안문이 등록되었습니다")
        this.$router.go() // 페이지 새로고침
      })
      .catch(() => {
        console.error("에러//json형태 : " + JSON.stringify(ids) + "//url : " + url )
      })
    }
  },
  props: {
      selected : Array
  },
}
</script>
