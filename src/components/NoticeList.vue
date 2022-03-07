<template>
  <div class="main-content-admin w-70 m-auto">
    <div class="table-title mb-20 d-flex space-between w-100">
      <select id="notice-search-category" name="notice-search-category" class="p-5 w-15">
        <option value="title">제목</option>
        <option value="name">작성자</option>
        <option value="contents">내용</option>
      </select>
      <div class="input-wrap p-5 b-1 w-80">
        <input type="text" class="" />
        <span class="float-r mr-5">search</span>
      </div>
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
          <tr class="bb-1 cursor" :key="index" v-for="(value,index) in data.slice(0,10)" @click="goToRead(value.NOTICE_ID)">
            <td class="w-10">
              <div v-if="value.CATEGORY == 'TRUE'" class="notice"> 공지 </div>
              <div v-else> {{ value.NOTICE_ID }} </div>
            </td>
            <td>{{ value.TITLE }}</td>
            <td class="w-15">{{ value.NAME }}</td>
            <td class="w-15">{{ value.CREATED_DATE }}</td>
          </tr>
        </tbody>
      </table>
      <div class="more bg-dark-gray mb-5">
        <p class="p-10 f-12 font-700 t-center">더보기</p>
      </div>
      <div class="btn-wrap float-r">
        <button class="cancel-btn f-12" @click="goToWrite(userId)">글쓰기</button>
      </div>
    </div>
  </div>
</template>

<script>
import sampledata from '@/assets/sampledata'

export default {
  name: 'NoticeList',
  data () {
    return {
      data: sampledata
    }
  },
  methods: {
    goToRead (noticeId) {
      this.$router.push({
        name: 'notice-board-category',
        params: {
          category: 'read',
          NOTICE_ID: noticeId
        }
      })
    },
    goToWrite (userId) {
      this.$router.push({
        name: 'notice-board-category',
        params: {
          category: 'write',
          USER_ID: userId // 사번
        }
      })
    }
  }
}
</script>

<style>
  td {
    padding: 10px;
  }
</style>
