import { createStore } from 'vuex'
import router from '../router'
import axios from 'axios'

export default createStore({
  // 프로젝트 내 모든 곳에서 사용이 가능한 변수들을 정의
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false
  },
  getters: {
  },
  // commit() 통해 이곳의 함수를 호출
  mutations: {
    loginSuccess (state, userInfo) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = userInfo
      // console.log('JSON.stringify(userInfo) : ' + JSON.stringify(userInfo))
      // console.log('JSON.stringify(userInfo) : ' + JSON.stringify(userInfo.LEVEL))
      alert('login Successed')

      // 관리자인지 여부가 어떤 변수명으로 넘어오는지 몰라서 일단 LEVEL으로 테스트
      if (JSON.stringify(userInfo.LEVEL) === '"수습사원"') {
        router.push({ name: 'device-list-board', params: { ID: JSON.stringify(userInfo.ID) } })
      } else if (JSON.stringify(userInfo.LEVEL) === '"관리자"') {
        router.push({ name: 'approval-list-board', params: { ID: JSON.stringify(userInfo.ID) } })
      }
    },
    loginError (state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logout (state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
    }
  },
  actions: {
    login ({ commit }, loginObj) {
      // IT사업본부 CPCODE == "G002"
      loginObj.CPCODE = 'G002'
      // loginObj ~ {"CPCODE":"G002", "ID":"00000000", "PWD":"password"}

      // 태광 서버 : https://www.t-ammo.com/IGWS/loginLegacy_.json
      // 15기 서버 : http://133.186.212.200:8080/loginOk.do
      axios
        .post('http://133.186.212.200:8080/loginOk.do', loginObj)
        .then((res) => {
          // console.log("res JSON : " + JSON.stringify(res))
          commit('loginSuccess', res.data)
        })
        .catch(() => {
          alert('login failed')
        })
    }
  },
  logout ({ commit }) {
    commit('logout')
    console.log('logout')
    alert('logout')
    router.push({ name: 'login' })
  }
})
