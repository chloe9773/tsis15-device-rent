  <template>
  <div class="logo-img-wrap mb-30">
    <img src="@/assets/img/img_symbol.png" alt="" class="logo" />
  </div>
  <div class="login-wrap w-100">
    <form id="" class="position-center w-30 b-1 p-50 border-radius-3" @submit.prevent="login()">
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
        <button id="login-btn" name="login-btn" class="submit-btn w-50">로그인</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
// import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      ID: "",
      PWD: "",
      CPCODE: "G002"
    }
  },
  methods: {
    login() {
      let data = {
        ID: this.ID,
        PWD: this.PWD,
        CPCODE: this.CPCODE
      }

      let router = this.$router;

      axios
        .post("/loginOk.do", data)
        .then((res) => {
          if(res.status == 200) {
            if (res.data.RESULT == 'FAIL') {
              alert("올바른 정보를 입력해주세요.")
            } else {
              this.$cookies.set("user_id", res.data.ID)
              this.$cookies.set("user_name", res.data.NAME)
              this.$cookies.set("user_dept", res.data.CP_NAME)
              this.$cookies.set("user_role", res.data.ROLE)
              // this.$cookies.set("user_role", 3) // 관리자로 하드코딩
              
              if (this.$cookies.get("user_role") > 1) router.push({ path : "/approval-list-board"})
              else router.push({ path : "/device-list-board"})
            }
          }
        })
        .catch((err) => {
          //alert("예기치 못한 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.")
        })
    }
  }
  // data () {
  //   return {
  //     id: null,
  //     pwd: null
  //   }
  // },
  // computed: {
  //   ...mapState(['isLogin', 'isLoginError'])
  // },
  // methods: {
  //   ...mapActions(['login', 'logout'])
  // }
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