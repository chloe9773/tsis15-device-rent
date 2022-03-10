<template>
  <div class="top mb-50">
    <div class="logo-img-wrap mb-30">
        <a href="https://www.tsis.co.kr/" class="logo-img-wrap">
          <img :src="require(`@/assets/img/img_symbol.png`)" alt="" class="logo">
        </a>
    </div>
    <div class="main-nav d-flex space-between bg-highlight white f-18 font-700 mb-50">
      <div class="nav-left d-flex space-between">
        <div class="p-20 menu">
          <router-link to="/device-list-board">단말기 목록</router-link>
        </div>
        <div class="p-20 menu">
          <router-link to="/approval-list-board">결재문서함</router-link>
        </div>
        <div class="p-20 menu">
          <router-link to="/notice-board/list">공지사항</router-link>
        </div>
      </div>
      <div class="nav-right d-flex space-between bg-highlight white f-18 font-700">
        <div v-bind:class="[{'p-20 menu d-none': role <= 1}, {'p-20 menu cursor': role >= 2}]"> 
          <!-- this.$cookies.get("user_role") -->
          <router-link to="/admin-board/admin">관리자</router-link>
        </div>
        <div class="p-20 menu cursor" v-on:click.prevent="logout">
          <span>로그아웃</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
  @import url("@/assets/css/reset.css");
  @import url("@/assets/css/common.css");
  @import url("@/assets/css/head.css");
  @import url("@/assets/css/admin.css");
</style>

<script>
  export default {
  created() {
    if(this.$cookies.get('user_role') != undefined || this.$cookies.get('user_role') != null || this.$cookies.get('user_role') != "") this.role = this.$cookies.get('user_role')
  },
  data() {
    return {
      role: 0
    }
  },
  methods: {
    logout() {
      // this.$router.push({name: "login"}) // 왜 로그인으로는 안가는지?
      this.$cookies.remove("user_id")
      this.$cookies.remove("user_name")
      this.$cookies.remove("user_role")      

      alert("로그아웃 되었습니다.")
      this.$router.push({ path : "/"})
    }
  }
}
</script>
