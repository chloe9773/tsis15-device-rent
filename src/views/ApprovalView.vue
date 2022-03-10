<!-- 결재문서함 -->
<template>
  <ApprovalModal v-if="openToggle === true" v-bind:document="document"/>
  <MenuBar/>
  <div class="main-content-admin w-70 m-auto">
    <div class="table-title mb-10 d-flex space-between w-100">
      <div class="table-title-left f-12">
        <span id="articl-total" class="title-left-item">15</span>
        <span class=" title-left-item">개의 게시물이 있습니다.</span>
      </div>
      <div class="table-title-right" style="transform:translateY(20%);">
        <span class="f-14">내가 기안자인 문서만 보기</span>
        <input type="checkbox" v-model="only" name="" id="" class="" v-on:change="seeMine()">
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
                <tr v-for="doc in docs" id="" :key="doc" class="bb-1 cursor" v-on:click="toggleModal(doc)">
                  <input type="hidden" :class="doc.document.drafted_user_id">
                  <td v-if="this.$cookies.get('user_id') == doc.document.drafted_user_id" class="w-10"><div class="drafter">기안자</div></td>
                  <td v-if="this.$cookies.get('user_id') != doc.document.drafted_user_id" class="w-10"><div class="approver">검토자</div></td>
                  <td class="w-15">{{doc.drafted_user_name}}</td>
                  <td>{{doc.document.title}}</td>
                  <td class="w-15">{{doc.document.requestdate}}</td>
                </tr>
              </tbody>
          </table>
      </div>
      <PageBtn />
    </div>
</template>

<style>
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
import ApprovalModal from '@/components/ApprovalModal.vue'
import PageBtn from '@/components/table/PageBtn.vue'

export default {
  name: 'ApprovalView',
  created() {
    //.get(`/document/1/${this.$cookies.get("user_id")}`)
    this.axios
      .get('/document/1/28108683')
      .then((res) => {
        console.log(res.data.list)
        this.docs = res.data.list
      }).catch((res) => {
          console.log(res)
      })
  },
  data() {
    return {
      docs: [],
      openToggle: false,
      document: {},
      only: false
    }
  },
  components: {
    MenuBar,
    ApprovalModal,
    Modal,
    PageBtn
  }, 
  methods: {
    toggleModal (data) {
      this.openToggle = true
      console.log(data)
      this.document = data
      this.$toggleModal('approval',2)
    },

    seeMine() {
      let mine = document.getElementsByClassName(this.$cookies.get('user_id'))
      console.log(mine)

      if (this.only == true) {
        for(let i = 0; i < mine.length; i++) {
          mine[i].parentNode.classList.add('d-none')
        }
      } else {
        for(let i = 0; i < mine.length; i++) {
          mine[i].parentNode.classList.remove('d-none')
        }
      }
    }
  }
}
</script>
