<template>
  <table class="table w-100">
    <thead class="f-14 font-700 bb-2 bt-2">
      <th class="p-20"></th>
      <th class="v-middle">임대시작일</th>
      <th class="v-middle">부서</th>
      <th class="v-middle">관리</th>
      <th class="v-middle">임대종료일</th>
      <th class="v-middle">부서</th>
      <th class="v-middle">관리</th>
    </thead>
    <tbody class="f-13 t-center">
      <!-- <tr v-for="log in logs" v-bind:key="log" class="bb-1" v-on:click="getDoc(log.doc_id)"> -->
      <tr class="bb-1" onclick="">
        <td class="w-5">1</td>
        <td class="w-15">2022/02/17</td>
        <td>손보어쩌고저쩌고</td>
        <td class="w-10">황민재</td>
        <td class="w-15">2022/02.27</td>
        <td>기획관리웅앵</td>
        <td class="w-10">임건호</td>
      </tr>
      <!-- </tr> -->
    </tbody>
  </table>
</template>

<script>
export default defineComponent({
  created() {
    console.log("test")
    // 주소 필요
    // this.axios
    //   .get('/item/paging/1')
    //   .then((res) => {
    //       // console.log(res)
    //       this.list = res.data.list
    //   }).catch((res) => {
    //       console.log(res)
    //   })
  },
  data() {
    return {
      rent_start: "",
      user_dept: "",
      user: "",
      rent_end: "",
      approver_dept: "",
      approver: ""
    }
  },
  methods: {
    getDoc(doc_id) {
      consoloe.log()
      
    }
  }
})
</script>
