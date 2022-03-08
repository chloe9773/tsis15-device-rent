<template>
  <div class="main-content-admin w-70 m-auto">
    <div class="table-title mb-20 d-flex space-between w-100">
      <select id="notice-search-category" name="notice-search-category" class="p-5 w-15">
        <option value="title">제목</option>
        <option value="name">작성자</option>
        <option value="contents">내용</option>
      </select>
      <div class="input-wrap p-5 b-1 w-80">
        <input type="text" class="" maxlength="50" v-model="keyword"/>
        <span class="float-r mr-5" @click="getDataByBtn(0, keyword)">search</span>      </div>
    </div>
    <div class="table-wrap">
      <table class="table w-100" style="overflow:auto;">
        <thead class="f-14 font-700 bb-2 bt-2">
          <th class="p-20"></th>
          <th class="v-middle">제목</th>
          <th class="v-middle">작성자</th>
          <th class="v-middle">작성일</th>
        </thead>
        <tbody class="f-13 t-center">
          <tr class="bb-1 cursor" :key="index" v-for="(value,index) in articles" @click="goToRead(value.notice_id)">
            <td class="w-10">
              <div> {{ value.notice_id }} </div>
            </td>
            <td>{{ value.title }}</td>
            <td class="w-15">{{ value.user_id }}</td>
            <td class="w-15">{{ value.create_date.substr(0,10) }}</td>
          </tr>
        </tbody>
      </table>
      <!-- keyword는 테스트용으로 넣은거. 나중에 삭제 -->
      <PageBtn
        v-bind:pageList="pageList"
        v-bind:currPage="currPage"
        v-bind:pages="pages"
        v-bind:keyword="keyword"
        @getDataByBtn="getDataByBtn"
        />
      <div class="btn-wrap float-r">
        <router-link to="/notice-board/write" class="cancel-btn f-12" @click="goToWrite(value.notice_id)">글쓰기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PageBtn from '@/components/table/PageBtn.vue'

export default {
  name: 'NoticeList',
  data () {
    return {
      currPage: 1, // current page
      pages: 1,
      keyword: null, // search keyword
      articles: [], // list of all articles
      pageList: []
    }
  },
  methods: {
    goToRead (noticeId) {
      this.$router.push({
        name: 'notice-board',
        params: {
          category: 'read',
          NOTICE_ID: noticeId
        }
      })
    },
    goToWrite (userId) {
      this.$router.push({
        name: 'notice-board',
        params: {
          category: 'write',
          USER_ID: userId // 사번
        }
      })
    },
    getDataByBtn (page, keyword) {
      if (page < 1) { page = 1 }
      if (keyword === null) { keyword = 'noData' }
      axios
        .get(`http://133.186.212.200:8080/notice/${keyword}/${page}`)
        .then((res) => {
          this.articles = res.data.list
          this.pageList = res.data.navigatepageNums
          this.keyword = keyword
          this.currPage = page
          this.pages = res.data.pages
          console.log('' + JSON.stringify(res.data))
        })
    }
  },
  created () {
    axios
      .get('http://133.186.212.200:8080/notice/noData/1')
      // .get('https://c52a7431-06ad-44ed-8a7a-6ee40ef0d552.mock.pstmn.io/notice')
      .then((res) => {
        this.articles = res.data.list
        this.pageList = res.data.navigatepageNums
        this.pages = res.data.pages
        console.log(JSON.stringify(res.data))
      })
      .catch(() => {
        console.log('글 읽기 오류')
      })
  },
  components: {
    PageBtn
  }
}
</script>

<style>
  td {
    padding: 10px;
  }
</style>
