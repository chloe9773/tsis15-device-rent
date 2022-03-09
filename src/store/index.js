import { createStore } from 'vuex'
import router from '../router'
import axios from 'axios'

export default createStore({
  // 프로젝트 내 모든 곳에서 사용이 가능한 변수,함수 등을 정의(전역)
  // state : 변수 / mutations: 변경 / actions : 함수
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false,
    articleInfo: {
      title: '',
      category: '',
      user_id: '',
      create_date: '',
      content: '',
      notice_id: ''
    }
  },
  getters: {
  },
  // commit() 통해 이곳의 함수를 호출
  mutations: {
    loginSuccess (state, userInfo) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = userInfo
      state.articleInfo = {}
      // console.log('JSON.stringify(userInfo) : ' + JSON.stringify(userInfo))
      alert('로그인 성공')

      // Routing(ROLE 0: user(대여) / 1: admin(허가/관리) / 2: superadmin(권한설정))
      if (JSON.stringify(userInfo.ROLE) === '"0"') {
        router.push({ name: 'device-list-board', params: { ID: JSON.stringify(userInfo.ID) } })
      } else if (JSON.stringify(userInfo.ROLE) === '1') {
        router.push({ name: 'approval-list-board', params: { ID: JSON.stringify(userInfo.ID) } })
      } else if (JSON.stringify(userInfo.ROLE) === '2') {
        router.push({ name: 'adminboard', params: { ID: JSON.stringify(userInfo.ID), category: 'admin' } })
      }
    },
    loginError (state) {
      state.userInfo = null
      state.isLogin = false
      state.isLoginError = true
      state.articleInfo = {}
      alert('사번 또는 비밀번호가 틀렸습니다.')
    },
    logout (state) {
      state.userInfo = null
      state.isLogin = false
      state.isLoginError = false
      state.articleInfo = {}
    },
    mutateArticleInfo (state, articleInfoObj) {
      state.articleInfo = articleInfoObj
    }
  },
  actions: {
    login ({ commit }, loginObj) {
      // IT사업본부 CPCODE == "G002"
      loginObj.CPCODE = 'G002'
      // loginObj -> {"CPCODE":"G002", "ID":"00000000", "PWD":"password"}

      // 태광 서버 : https://www.t-ammo.com/IGWS/loginLegacy_.json
      // 15기 서버 : http://133.186.212.200:8080/loginOk.do
      axios
        .post('http://133.186.212.200:8080/loginOk.do', loginObj)
        .then((res) => {
          console.log("res JSON : " + JSON.stringify(res.data))
          if (res.data.RESULT === 'SUCCESS') {
            commit('loginSuccess', res.data)
          } else {
            commit('loginError', res.data)
          }
        })
        .catch(() => {
          alert('예기치 않은 오류입니다. 관리자에게 문의하세요')
        })
    },
    logout ({ commit }) {
      commit('logout')
      console.log('logout')
      alert('logout')
      router.push({ name: 'login' })
    },
    storeArticleInfo ({ commit }, articleInfoObj) {
      commit('mutateArticleInfo', articleInfoObj)
    },
    removeArticleInfo ({ commit }) {
      let emptyArticleInfo = {
        title: '',
        category: '',
        user_id: '',
        create_date: '',
        content: ''
      }
      commit('mutateArticleInfo', emptyArticleInfo)
    }
  },
})
