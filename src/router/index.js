import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    // 로그인 화면 주소
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    // 단말기 목록 주소
    path: '/device-list-board',
    name: 'device-list-board',
    component: () => import('../views/CommonView.vue')
  },
  {
    // 결재문서함 주소
    path: '/approval-list-board',
    name: 'approval-list-board',
    component: () => import('../views/ApprovalView.vue')
  },
  {
    // 공지사항
    path: '/notice-board',
    name: 'notice-board',
    component: () => import('../views/NoticeView.vue')
  },
  {
    // 어드민
    path: '/admin-board',
    name: 'admin-board',
    component: () => import('../views/AdminView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
