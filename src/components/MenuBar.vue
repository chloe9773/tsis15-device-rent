<template>
  <div class="top mb-50">
    <div class="logo-img-wrap mb-30">
        <!-- <img src="@/assets/img/img_symbol.png" alt="" class="logo" > -->
        <img :src="require(`@/assets/img/img_symbol.png`)" alt="" class="logo">
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
      <div class="nav-right">
        <div class="p-20 menu">
          <router-link to="/admin-board/admin">관리자</router-link>
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
