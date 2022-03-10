<template>
  <div class="main-content-admin w-70 m-auto">
    <TableTop>
      <template #table-top-select>
        <select id="notice-search-category" name="notice-search-category" class="p-5 w-15" v-model="searchCategoryOptionValue">
          <option :key="index" v-for="(option,index) in searchCategoryOptions" :value="option.value">{{ option.expression }}</option>
        </select>
      </template>
      <template #table-top-search>
        <div class="input-wrap p-5 b-1 w-80">
          <input type="text" class="" maxlength="50" v-model="keyword"/>
          <button class="cancel-btn float-r mr-5" @click="getDataByBtn(classification, keyword, 0, searchCategoryOptionValue)">search</button>
        </div>
      </template>
    </TableTop>
    <div class="table-wrap">
      <table class="table w-100" style="overflow:auto;">
        <thead class="f-14 font-700 bb-2 bt-2">
          <th class="p-20"></th>
          <th class="v-middle">제목</th>
          <th class="v-middle">작성자</th>
          <th class="v-middle">작성일</th>
        </thead>
        <tbody class="f-13 t-center">
          <tr class="bb-1 cursor" :key="index" v-for="(value,index) in articles" @click="goToPage('read', index)">
            <td class="w-10">
              <div> {{ index + 1 + (currPage - 1) * 10 }} </div>
            </td>
            <td>{{ value.title }}</td>
            <td class="w-15">{{ value.user_id }}</td>
            <td class="w-15">{{ utcToKst(value.create_date) }}</td>
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
      <div class="btn-wrap float-r">
        <router-link to="/notice-board/write" class="cancel-btn f-12" @click="goToPage('write', null)">글쓰기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TableTop from '@/components/table/TableTop.vue'
import PageBtn from '@/components/table/PageBtn.vue'
import { mapActions } from 'vuex'


export default {
  name: 'NoticeList',
  components: {
    TableTop,
    PageBtn
  },
  data () {
    return {
      // 검색 옵션 목록 (selectbox)
      searchCategoryOptions: [
        {
          value: 'title',
          expression: '제목'
        },
        // {
        //   value: 'name',
        //   expression: '작성자'
        // },
        // {
        //   value: 'content',
        //   expression: '내용'
        // }
      ],
      searchCategoryOptionValue: 'title', // initial option value
      classification: 'notice', // use api http://133.186.212.200:8080/${classification}/...

      currPage: 1, // current page
      pages: 1, // total pages
      keyword: null, // search keyword
      pageList: [], // list of page numbers displayed on paging box
      // 테이블에 출력될 정보
      articles: [] // list of all articles
    }
  },
  created () {
    this.axios
      .get(`/notice/1`)
      .then((res) => {
        this.articles = res.data.list
        this.pageList = res.data.navigatepageNums
        this.pages = res.data.pages
      })
      .catch(() => {
        alert('글 읽기 오류')
      })
  },
  methods: {
    // 페이지 전환시, store에 저장하여 데이터 전달 (형제 컴포넌트간 전달)
    ...mapActions(['storeArticleInfo', 'removeArticleInfo']),
    goToPage (pageCategory, index) {
      if (index === null || (index >= 0 && index < 10)) {
        if (index === null) {
          // 'write'로 가는 경우 store의 글 정보 삭제(초기화)
          this.removeArticleInfo()
        } else {
          // 'read'로 가는 경우 store에 글 정보 저장
          this.storeArticleInfo(this.articles[index])
        }
        this.$router.push({
          name: 'notice-board',
          params: {
            category: pageCategory
          }
        })
      } else {
        alert("페이지를 불러오는 데 실패했습니다. (인덱스 에러)")
        this.$router.go(0)
      }
    },
    getDataByBtn (classification, keyword, page, searchCategoryOptionValue) {
      let apiUrl = ''
      if (page < 1) {
        page = 1
      } else if (page > this.pages) {
        page = this.pages
      }
      if (keyword === null || keyword == '')
        apiUrl = `/${classification}/${page}`
      else if (typeof keyword == "string")
        apiUrl = `/${classification}/${keyword}/${page}`
      else
        alert('형식에 맞지 않는 검색어 입니다.')
      if (searchCategoryOptionValue == 'title') {
        this.axios
          .get(apiUrl)
          .then((res) => {
            this.articles = res.data.list
            this.pageList = res.data.navigatepageNums
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

<style>
  td {
    padding: 10px;
  }
</style>
