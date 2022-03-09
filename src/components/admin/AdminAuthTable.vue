<!-- 어드민 보드 - 서브 메뉴(default) - 어드민 권한 관리 --> 
<template>
  <div class="right-content b-1 p-35 w-60 border-radius-2">
    <TableTop>
      <template #table-top-select>
        <select class="p-5 w-20" id="select" name="select" v-model="keyword">
          <option v-for="opt in searchKey" :value="opt.value" v-bind:key="opt" :selected="opt.value === 'user_id'">{{opt.text}}</option>
        </select>
      </template>
      <template #table-top-search>
        <div class="input-wrap p-5 b-1 w-70">
          <input type="text" name="search-word" id="search-word" class="" />
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
          <tr class="bb-1" onclick="">
            <td class="w-15">28108386</td>
            <td class="w-10">박정화</td>
            <td>소속어쩌구저쩌구</td>
            <td class="w-15">부서웅앵</td>
            <td class="w-10">사원</td>
            <td class="w-15">
              <input type="checkbox" /> <!-- 데이터 바인딩 후 status에 따라 check 적용 및 버튼 이벤트 추가 -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TableTop from '@/components/table/TableTop.vue'
// 테이블 상단 셀렉트 + 인풋 + 버튼 공통 사용 분리
export default {
  name: 'AdminView',
  components: {
    TableTop
  },
  data() {
    return {
      searchKey: [
        {
          text: "사번",
          value: "user_id"
        },
        {
          text: "성명",
          value: "name"
        },
        {
          text: "부서명",
          value: "dept_name"
        }
      ]
    }
  },
  methods: {
    getSearch(keyword) {
      console.log(this.keyword)
    }
  }
}
</script>
