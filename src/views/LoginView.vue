<template>
  <div class="logo-img-wrap mb-30">
    <img src="@/assets/img/img_symbol.png" alt="" class="logo" />
  </div>
  <div class="login-wrap w-100">
    <form id="" class="position-center w-30 b-1 p-50 border-radius-3" @submit.prevent="login({ ID, PWD })">
      <div class="m-auto id-wrap mb-10 w-50 border-radius-2 b-1">
        <input
          id="id"
          name="id"
          type="text"
          class="p-10"
          placeholder="통합그룹웨어 사번"
          tabindex="1"
          autofocus
          v-model="ID"
        />
      </div>
      <div class="m-auto pwd-wrap mb-20 w-50 border-radius-2 b-1">
        <input
          id="pwd"
          name="pwd"
          type="password"
          class="p-10"
          placeholder="비밀번호"
          tabindex="2"
          v-model="PWD"
        />
      </div>
      <div class="t-center">
        <button id="login-btn" name="login-btn" class="submit-btn w-50" @click='loginToDeviceListBoard'>로그인</button>
      </div>
    </form>
    <button id="logout-btn" name="logout-btn" class="w-50" @click="logout()">로그아웃</button>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      id: null,
      pwd: null
    }
  },
  computed: {
    ...mapState(['isLogin', 'isLoginError'])
  },
  methods: {
    ...mapActions(['login', 'logout'])
  }
}
</script>

<style lang="css">
@import "@/assets/css/reset.css";
@import "@/assets/css/common.css";
@import "@/assets/css/head.css";
.login-wrap>form {
  box-shadow: 3px 2px 2px #c5c5c5;
}
input {
  border: 1px solid transparent;
}
</style>
