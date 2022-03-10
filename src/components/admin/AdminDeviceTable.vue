<!-- 어드민 보드 - 서브 메뉴 - 디바이스 추가 -->
<template>
  <DeviceDetailLog v-if="openToggle === true" v-bind:item="info"/>
  <div class="right-content b-1 p-35 w-60 border-radius-2">
    <div class="table-wrap">
      <table class="table w-100" id="device-list-table">
        <thead class="f-14 font-700 bb-2 bt-2">
          <th class="p-20">종류</th>
          <th class="v-middle">브랜드</th>
          <th class="v-middle">단말기명</th>
          <th class="v-middle">대여 현황</th>
        </thead>
        <tbody class="f-13 t-center" id="ttt">
        <tr :key="index" v-for="(item,index) in list" class="bb-1 cursor tabletr" v-on:click="getLogs(item);">
          <td class="w-15" id="category" >{{item.category}}</td>
          <td class="w-15" id="brand" >{{item.brand}}</td>
          <td id="name" >{{item.name}}</td>
          <td class="w-25 grn" id="status"> {{item.status}}</td>
        </tr>
        </tbody>
      </table>
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
  </div>
</template>

<script>
import PageBtn from '@/components/table/PageBtn.vue'
import DeviceDetailLog from '@/components/admin/DeviceDetailLog.vue'

export default {
  name: 'AdminView',
  components: {
    DeviceDetailLog,
    PageBtn
  },
  data() {
    return {
      classification: 'item', // use api http://133.186.212.200:8080/${classification}/...

      currPage: 1, // current page
      pages: 1, // total pages
      keyword: null, // search keyword
      pageList: [], // list of page numbers displayed on paging box
      // 테이블에 출력될 정보
      list: [], // list
      keyword: "",

      selected: [],
      slides: document.getElementsByClassName('tabletr'),
      item_id: [],
      serialnum: [],
      name: [],
      brand: [],
      category: [],
      status: [],
      pagnum: 1,
      slist: [],
      test: [],
      openToggle: false,
      info: {}
    }
  },
  created () {
    this.axios
        .get('/item/paging/1')
        .then((res) => {
          console.log(JSON.stringify(res))
          this.list = res.data.list
          this.pageList = res.data.navigatepageNums
          this.pages = res.data.pages
        }).catch((res) => {
            alert('목록을 불러올 수 없습니다.')
        })
  },
  methods: {
    getDataByBtn (classification, keyword, page, searchCategoryOptionValue) {
      let apiUrl = ''
      if (page < 1) {
        page = 1
      } else if (page > this.pages) {
        page = this.pages
      }
      if (keyword === null || keyword == '')
        apiUrl = `/${classification}/paging/${page}`
      else if (typeof keyword == "string")
        apiUrl = `/${classification}/${keyword}/${page}`
      else
        alert('형식에 맞지 않는 검색어 입니다.')
      this.axios
        .get(apiUrl)
        .then((res) => {
          this.list = res.data.list
          this.pageList = res.data.navigatepageNums
          if (keyword === null || keyword == '') {
            this.keyword = ""
          } else {
            this.keyword = keyword
          }
          this.currPage = page
          this.pages = res.data.pages
        })
    },
    getLogs(device_info) {
      this.info = device_info;
      this.openToggle = true
    }
  }
}
</script>
