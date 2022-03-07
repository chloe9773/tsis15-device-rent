<template>
    <div class="main-content-admin w-70 m-auto">
        <div class="table-title- mb-20 d-flex space-between">
            <div class="table-title-left d-flex w-70">
                <select name="" id="" class="p-5 mr-5">
                    <option value="search-keyword">단말기명</option>
                </select>
                <div class="input-wrap p-5 b-1 w-70">
                    <input type="text" class="" />
                    <span class="float-r mr-5">search</span>
                </div>
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
                        <button class="active-btn" @click="toggleModal('form');">대여하기</button>
                    </th>
                    <th class="v-middle hiddencol">
                      <input type="hidden">
                    </th>
                </thead>
                <tbody class="f-13 t-center" id="ttt">
                  <tr :key="index" v-for="(item,index) in list" class="abc">
                    <!-- <td>{{index}}</td> -->
                    <td class="w-15" id="category" value = item.category>{{item.category}}</td>
                    <td class="w-10" id="brand" value = item.brand>{{item.brand}}</td>
                    <td id="name" value= item.name>{{item.name}}</td>
                    <td class="w-15 grn" id="status" value= item.status> {{item.status}}</td>
                    <td class="w-15">
                      <input type="checkbox" class="devicecheck" v-model = "selected" />
                    </td>
                    <td class="w-10 hiddencol">
                      <input type="hidden" value= item.serialnum/>
                    </td>
                  </tr>
                </tbody>
            </table>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'


// 창이 열리자마자 데이터 받아와서 담기

export default {
  // 대여 가능 항목만 보기 체크 : borrowChecked
  // 각 row 체크 : v-model = "selected"
  data () {
    return {
      list: [],
      selected: [],
      slides: document.getElementsByClassName('abc'),
      item_id: [],
      serialnum: [],
      name: [],
      brand: [],
      category: [],
      status: [],
    }
  },
  methods: {
    // 대여 가능 항목만 보기 체크
    availableChecked: function () {
      alert('대여가능항목눌림' + "T&F : " + document.getElementById('usecheckbox').checked + "///////"+this.slides)
      if (document.getElementById('usecheckbox').checked === true) {
        for (let i=0; i<this.slides.length;i++) {
          if(this.slides[i].getElementsByTagName("td")[3].innerText==='예약중') {
            this.slides[i].style.display='none'
          }
        }
      } else {
          for (let i=0; i<this.slides.length;i++){
            if(this.slides[i].getElementsByTagName("td")[3].innerText==='예약중'){
            this.slides[i].style.display=''
          }
        }
      }
    }
  },
    toggleModal (category, type) {
      // 선택된 디바이스 리스트 모달창에 넘겨주기
        alert(this.selected)
        this.selected.
        this.toggleModal(category, type)
        
    }
  ,
  created: function(){
    axios.get('http://133.186.212.200:8080/item').then(res => {
      console.log("받아온 데이터 >>>"+res.data)
      this.list=res.data
      console.log("변환된 데이터 >>>"+this.list)
  }).catch(res => {
    console.log(res + 'zz')
  })
  }

  }


</script>

<style scoped>
.hiddencol {
  display: none;
}
</style>