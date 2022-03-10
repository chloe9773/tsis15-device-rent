<!-- 결재문서함 -->
<template>
  <ApprovalModal v-if="openToggle === true" v-bind:document="document"/>
  <MenuBar/>
  <div class="main-content-admin w-70 m-auto">
    <div class="table-title mb-10 d-flex space-between w-100">
      <div class="table-title-left f-12">
        <span id="articl-total" class="title-left-item">{{total}}</span>
        <span class=" title-left-item">개의 게시물이 있습니다.</span>
      </div>
      <div class="table-title-right" style="transform:translateY(20%);">
        <span class="f-14">내가 기안자인 문서만 보기</span>
        <input type="checkbox" v-model="only" name="" id="" class="">
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
              <tbody v-for="doc in docs" id="" :key="doc" class="f-13 t-center">
                <tr v-if="this.$cookies.get('user_id') == doc.document.drafted_user_id || !only" class="bb-1 cursor" v-on:click="toggleModal(doc)">
                  <input type="hidden" :class="doc.document.drafted_user_id">
                  <td v-if="this.$cookies.get('user_id') == doc.document.drafted_user_id" class="w-10"><div class="drafter">기안자</div></td>
                  <td v-if="this.$cookies.get('user_id') != doc.document.drafted_user_id" class="w-10"><div class="approver">검토자</div></td>
                  <td class="w-15">{{doc.drafted_user_name}}</td>
                  <td>{{doc.document.title}}</td>
                  <td class="w-15">{{utcToKst(doc.document.requestdate)}}</td>
                </tr>
              </tbody>
          </table>
      </div>
      <PageBtn
        v-bind:pageList="pageList"
        v-bind:currPage="currPage"
        v-bind:pages="pages"
        v-bind:keyword="keyword"
        v-bind:searchCategoryOptionValue="searchCategoryOptionValue"
        v-bind:classification="classification"
        @getDataByBtn="getDataByBtn"
        />
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
    this.axios
      .get(`/document/1/${this.$cookies.get('user_id')}`)
      .then((res) => {
        // console.log(res.data.list)
        this.total = res.data.total
        this.docs = res.data.list
        this.pageList = res.data.navigatepageNums
        console.log('res' + JSON.stringify(res))
        console.log('pageList ' + JSON.stringify(this.pageList))
        console.log('pages ' + JSON.stringify(this.pages))
        console.log('page ' + JSON.stringify(this.page))
        this.pages = res.data
      }).catch((res) => {
          // console.log(res)
      })
  },
  data() {
    return {
      searchCategoryOptionValue: 'title', // initial option value
      classification: 'document', // use api http://133.186.212.200:8080/${classification}/...

      currPage: 1, // current page
      pages: 1, // total pages
      keyword: null, // search keyword
      pageList: [], // list of page numbers displayed on paging box
      // 테이블에 출력될 정보
      docs: [], // list of all articles
      
      openToggle: false,
      document: {},
      only: false,
      total: 0
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
    getDataByBtn (classification, keyword, page, searchCategoryOptionValue) {
      let apiUrl = ''
      if (page < 1) {
        page = 1
      } else if (page > this.pages) {
        page = this.pages
      }
      apiUrl = `/${classification}/${page}/${this.$cookies.get("user_id")}`
      if (searchCategoryOptionValue == 'title') {
        this.axios
          .get(apiUrl)
          .then((res) => {
            this.docs = res.data.list
            this.pageList = res.data.navigatepageNums
            console.log(this.pageList)
            if (keyword === null || keyword == '') {
              this.keyword = ""
            } else {
              this.keyword = keyword
            }
            this.currPage = page
            this.pages = res.data.pages
          })
      } else {
        alert('검색 카테고리 선택에서 문제가 발생했습니다.')
      }
    },
    utcToKst(data){
      const kst = moment(data,"YYYY-MM-DDTHH:mm:ssZ")
      const result = kst["_d"];
      return moment(result).format('YYYY-MM-DD')
    }
  }
}
</script>
