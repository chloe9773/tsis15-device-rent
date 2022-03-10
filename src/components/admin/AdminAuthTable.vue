<!-- 어드민 보드 - 서브 메뉴(default) - 어드민 권한 관리 --> 
<template>
  <div class="right-content b-1 p-35 w-60 border-radius-2">
    <TableTop>
      <template #table-top-select>
        <select class="p-5 w-20" id="select" name="select" v-model="keyword" required>
          <option v-for="opt in searchKey" :value="opt.value" v-bind:key="opt" :selected="opt.value=='user_id'">{{opt.text}}</option>
        </select>
      </template>
      <template #table-top-search>
        <div class="input-wrap p-5 b-1 w-70 pos-r">
          <input type="text" v-model="keyword" name="search-word" id="search-word" class="pos-a" placeholder="사번을 입력해주세요." maxlength="8" style="top:24%"/>
          <button class="float-r mr-5 cancel-btn" v-on:click="getSearch(keyword)">검색</button>
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
      searchKey: [
        {
          text: "사번",
          value: "user_id"
        }
      ],
      users: [],
      keyword: ""
    }
  },
  created () {
    // /user/${input}/${paging}
    this.axios
      .get('/user')
      .then((res) => {
        this.users = res.data
      })
      .catch((err) => {
        alert("사용자 목록을 불러오는데 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
      })
  },
  methods: {
    // 유저 검색
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
      .put(`/user/up/${id}/${role_to_be}`)
      .then((res) => {
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
