<!-- 어드민 보드 - 서브 메뉴(default) - 어드민 권한 관리 --> 
<template>
  <div class="right-content b-1 p-35 w-60 border-radius-2">
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
      <table class="table w-100">
        <thead class="f-14 font-700 bb-2 bt-2">
          <th class="p-20">사번</th>
          <th class="v-middle">성명</th>
          <th class="v-middle">소속</th>
          <th class="v-middle">부서</th>
          <th class="v-middle">직급</th>
          <th class="v-middle">관리자 지정</th>
        </thead>
        <tbody class="f-13 t-center">
          <tr v-for="user in users" v-bind:key="user" class="bb-1">
            <td class="w-15">{{user.user_id}}</td>
            <td class="w-10">{{user.name}}</td>
            <td>{{user.dept_name}}</td>
            <td class="w-15">{{user.dept_name}}</td>
            <td class="w-10">{{user.position}}</td>
            <td class="w-15">
              <input type="checkbox" :value="user.user_id" @change="setAdmin(user.user_id, user.role, user.name)" :checked="user.role == 2"/> <!-- 데이터 바인딩 후 status에 따라 check 적용 및 버튼 이벤트 추가 -->
            </td>
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
import TableTop from '@/components/table/TableTop.vue'
import PageBtn from '@/components/table/PageBtn.vue'
// 테이블 상단 셀렉트 + 인풋 + 버튼 공통 사용 분리
export default {
  name: 'AdminView',
  components: {
    TableTop,
    PageBtn
  },
  data() {
    return {
      // 검색 옵션 목록 (selectbox)
      searchCategoryOptions: [
        {
          value: "user_id",
          expression: "사번"
        },
        // {
        //   value: "name",
        //   expression: "성명"
        // }
      ],
      searchCategoryOptionValue: 'user_id', // initial option value
      classification: 'user', // use api http://133.186.212.200:8080/${user}/...

      currPage: 1, // current page
      pages: 1, // total pages
      keyword: null, // search keyword
      pageList: [], // list of page numbers displayed on paging box
      // 테이블에 출력될 정보
      users: []
    }
  },
  created () {
    this.axios
      .get(`/user/1`)
      .then((res) => {
        this.users = res.data.list
        this.pageList = res.data.navigatepageNums
        this.pages = res.data.pages
      })
      .catch(() => {
        alert("목록을 불러오는데 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
      })
  },
  methods: {
    // 유저 검색
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

      let is_numeric = /^[0-9]+$/
      if (!(keyword !== null) && !(keyword !== '') && !is_numeric.test(keyword)) {
        alert("숫자만 입력 가능합니다.")
      } else {
        if (searchCategoryOptionValue == 'user_id') {
          this.axios
            .get(apiUrl)
            .then((res) => {
              this.users = res.data.list
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
      }
    },//2여기
    getSearch(keyword) {
      let is_numeric = /^[0-9]+$/
      if (!is_numeric.test(keyword)) alert("숫자만 입력 가능합니다.")
      else {
        this.axios
        .get(`/user/${this.keyword}`)
        .then((res) => {
          console.log(res)
          if(res.status != 200) alert("사원 검색에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.")
          else {
            this.users = [res.data]
            this.keyword = keyword
          }
          // this.users = res.data
        })
        .catch((err) => {
          alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.")
        })
      }
    },

    // 유저 role 변경
    setAdmin(id, role, name) {
      let role_to_be = 2

      if(role  == 2) role_to_be = 1
      this.axios
      .put(`/${this.classification}/up/${id}/${role_to_be}`)
      .then((res) => {
        console.log(res)
        console.log(JSON.stringify(res))
        if(res.status != 200) alert("관리자 지정에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.")
        else {
          this.$cookies.set('user_role', role_to_be)
          alert(`${name}님의 관리자 레벨이 변경되었습니다.`)
        }
      })
      .catch((err) => {
        alert("관리자 지정에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.")
      })
    }
  }
}
</script>
