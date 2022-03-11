import { createStore } from 'vuex'
import router from '../router'
import axios from 'axios'

export default createStore({
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
  mutations: {
    loginSuccess (state, userInfo) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = userInfo
      state.articleInfo = {}
      alert('로그인 성공')

      // Routing(ROLE 1: user / 2: admin / 3: superadmin(권한설정 권한 only))
      if (JSON.stringify(userInfo.ROLE) === '1') {
        router.push({ name: 'device-list-board', params: { ID: JSON.stringify(userInfo.ID) } })
      } else if (JSON.stringify(userInfo.ROLE) === '2') {
        router.push({ name: 'approval-list-board', params: { ID: JSON.stringify(userInfo.ID) } })
      } else if (JSON.stringify(userInfo.ROLE) === '3') {
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
        .post('/loginOk.do', loginObj)
        .then((res) => {
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
