<!-- 결재문서함 -->
<template>
  <Modal/>
  <MenuBar/>
  <div class="main-content-admin w-70 m-auto">
    <div class="table-title mb-10 d-flex space-between w-100">
      <div class="table-title-left f-12" style="display:table-cell;vertical-align:middle;">
        <span id="articl-total" class="title-left-item">15</span>
        <span class=" title-left-item">개의 게시물이 있습니다.</span>
      </div>
      <div class="table-title-right d-flex">
        <select name="" id="" class="w-30 p-5">
          <option value="search-keyword">단말기명</option>
        </select>
        <div class="input-wrap d-flex space-between b-1 p-5">
            <input type="text" class="w-70" id="search" name="search" />
            <button class="cancel-btn f-12">검색</button>
        </div>
      </div>
    </div>
      <div class="table-wrap">
          <table class="table w-100 mb-10">
              <thead class="f-14 font-700 bb-l-2 bt-l-2" style="background-color:#e8e8e8">
                <th class="p-20">번호</th>
                <th class="v-middle">작성자</th>
                <th class="v-middle">제목</th>
                <th class="v-middle">작성일</th>
              </thead>
              <tbody class="f-13 t-center">
                <tr class="bb-1 cursor" onclick="">
                  <td class="w-10">1</td>
                  <td class="w-15">박정화</td>
                  <td>단말기 대여 요청 협조문</td>
                  <td class="w-15">2022/02/27</td>
                </tr>
                <tr class="bb-1 cursor" onclick="">
                  <td class="w-10">1</td>
                  <td class="w-15">박정화</td>
                  <td>단말기 대여 요청 협조문</td>
                  <td class="w-15">2022/02/27</td>
                </tr>
              </tbody>
          </table>
      </div>
      <div class="page-wrap f-12 t-center mt-20">
        <span class="pg-btn p-5 disable">처음으로</span>
        <span class="pg-btn disable">이전</span>
        <span class="pg-btn active">1</span>
        <span class="pg-btn">2</span>
        <span class="pg-btn">3</span>
        <span class="pg-btn">4</span>
        <span class="pg-btn">5</span>
        <span class="pg-btn">6</span>
        <span class="pg-btn">7</span>
        <span class="pg-btn">8</span>
        <span class="pg-btn">9</span>
        <span class="pg-btn">10</span>
        <span class="pg-btn">다음</span>
        <span class="pg-btn">끝으로</span>
      </div>
      <div class="btn-wrap">
        <button class="cancel-btn float-r" v-on:click="toggleModal()">글쓰기</button>
      </div>
    </div>
</template>

<style scoped>
  .table-title-left {
    display: table-cell;
    vertical-align: middle;
  }
  .title-left-item {
    position:relative;
    top:50%;
  }
  tr:hover {
    background-color: rgba(197, 197, 197, 0.2);
  }
  tr:nth-chile(2n+1) {
    background-color: #e8e8e8;
  }
</style>

<script>
import MenuBar from '@/components/MenuBar.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'ApprovalView',
  components: {
    MenuBar,
    Modal
  }, 
  methods: {
    toggleModal() {
      this.$toggleModal()
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
