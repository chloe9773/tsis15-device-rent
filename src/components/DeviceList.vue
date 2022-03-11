<template>
<DeviceDetail v-bind:selected="selected" v-if ="renderComp === true"/>
<DeviceDetailLog v-bind:devicedetaillist="devicedetaillist" v-if ="isDeviceDetailLog === true"/>
    <div class="main-content-admin w-70 m-auto">
        <div class="table-title- mb-20 d-flex space-between">
            <div class="table-title-left d-flex w-70">
            </div>
            <div class="table-title-right" style="transform:translateY(20%);">
                <span class="f-14" >대여 가능 항목만 보기</span>
                <input type="checkbox" name="" id="usecheckbox" class="" @click="availableChecked">
            </div>
        </div>
        <div class="table-wrap w-100">
            <table class="table w-100" id="device-list-table">
                <thead class="f-14 font-700 bb-2 bt-2">
                    <th class="p-20">종류</th>
                    <th class="v-middle">브랜드</th>
                    <th class="v-middle">단말기명</th>
                    <th class="v-middle">대여 현황</th>
                    <th class="v-middle">
                        <button class="active-btn" v-on:click="toggleModal('approval',1)">대여하기</button>
                    </th>
                    <th class="v-middle hiddencol">
                      <input type="hidden">
                    </th>
                </thead>
                <tbody class="f-13 t-center" id="ttt">
                  <tr :key="index" v-for="(item,index) in list"  class="bb-1 cursor tabletr">
                    <td class="w-15" id="category" >{{item.category}}</td>
                    <td class="w-10" id="brand" >{{item.brand}}</td>
                    <td id="name" @click="deviceDeatailclick(index)"  >{{item.name}}</td>
                    <td v-bind:class="[{'w-15':item.status == '대여가능'}, {'w-15 grn':item.status == '대여불가,예약가능'}, {'w-15 red':item.status == '대여불가,예약불가'}]" id="status"> {{item.status}}</td>
                    <td class="w-15">
                      <input type="checkbox" class="devicecheck" v-model= "selected" :value = item @change="tmpFunc()"/>
                    </td>
                    <td class="w-10 hiddencol">
                      <input type="hidden" :value = item.serialnum />
                    </td>
                  </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import DeviceDetail from '@/components/DeviceDetail.vue'
import DeviceDetailLog from '@/components/admin/DeviceTableDetailLog.vue'
export default {
  // 창이 열리자마자 데이터 받아와서 담기
  created: function(){
    this.axios.get('/item/paging/1').then(res => {
      this.list=res.data.list
  }).catch(res => {
    console.log(res)
  })
  },

  name: 'DeviceList',
  components: {
    Modal,
    DeviceDetail,
    DeviceDetailLog
  },

  // 각 row 체크 : v-model = "selected"
  data () {
    return {
      list: [],
      selected: [],
      slides: document.getElementsByClassName('tabletr'),
      renderComp: false,
      user_id: '',
      name:'',
      dept_name:'',

      // 디바이스 상세 모달
      isDeviceDetailLog: false,
      devicedetaillist:[]
    }
  },
  
  methods: {
    //모달 렌더링
    tmpFunc() {
      this.renderComp = true
      this.isDeviceDetailLog = false
    },

    //상세보기 모달
    deviceDeatailclick(index){
      console.log("list : "+this.list[index].status+"//index : " + index + "상세내용"+this.list[index][1])
      this.renderComp = false
      let devicedetaillist = []
      devicedetaillist.push(this.list[index])
      this.devicedetaillist = devicedetaillist
      this.isDeviceDetailLog = !this.isDeviceDetailLog  
      console.log("클릭했을때 T&F : " + this.isDeviceDetailLog)
      // this.$toggleModal('device',0)
    },
    //체크된 디바이스 대여하기
    toggleModal (category, type) {
      type = 1 
      this.isDeviceDetailLog = false
      this.renderComp = true
      //(1)다중 대여시, 모두 대여가능 상태여야 할 때
      outerLoop:
      if (this.selected.length > 1 && this.selected.length <= 5) {
        for (let i=0 ; i < this.selected.length ; i++) {
          if(this.selected[i].status != '대여가능') {
            alert("알림 : 2개 이상의 단말기 대여시, 모두 대여가능 상태여야 합니다!!")
            break outerLoop
          }
        }
        console.log("여러개를 선택하여 대여 : "+"// category : " + category + "// type : " + type)
        this.$toggleModal(category, type)
      }

      //(2)한 개만 선택
      else if (this.selected.length = 1) {
        //(2-1)대여 가능 상태
        if (this.selected[0].status == '대여가능') {
          console.log("this.selected.length : " + this.selected.length + "//한 개만 선택하여 대여 : " + "// category : " + category + "// type : " + type)
          this.$toggleModal(category, type)
        } 
        
        //(2-2)연장
        else if (this.selected[0].status == null) {
          type = 2
          console.log("디바이스 연장 : " + "// category : " + category + "// type : " + type)
          this.$toggleModal(category, type)
        }
        //(2-3)현재 대여상태이나 예약 가능시
        else if (this.selected[0].status == '대여불가,예약가능') {
          type = 3
          console.log("예약 : "+"// category : " + category + "// type : " + type)
          this.$toggleModal(category, type)
        } 
      
        //(2-4)대여 및 예약 모두 불가할시
        else if (this.selected.status[0] == '대여불가,예약불가') {
          type = 4
          alert("알림 : 선택된 단말기는 현재 대여가 불가합니다")
          this.$toggleModal(category, type)
        }
      } 
      //(3) 체크 갯수 5개 초과한 채로 대여하기 클릭 시
      else if (this.selected.length > 5) {
        alert("대여 가능한 단말기 갯수를 초과하였습니다")
      } 
    },

    // 대여 가능 항목만 보기 체크
    availableChecked: function () {
      if (document.getElementById('usecheckbox').checked === true) {
        for (let i=0; i<this.slides.length;i++) {
          if(this.slides[i].getElementsByTagName("td")[3].innerText==='대여불가,예약불가') {
            this.slides[i].style.display='none'
          }
        }
      } else {
          for (let i=0; i<this.slides.length;i++){
            if(this.slides[i].getElementsByTagName("td")[3].innerText==='대여불가,예약불가'){
            this.slides[i].style.display=''
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.hiddencol {
  display: none;
}
</style>