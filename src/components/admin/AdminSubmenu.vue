<!-- 어드민 보드 좌측 서브메뉴 컴포넌트 -->
<template>
  <div class="left-menu-wrap w-10 mr-70">
    <div class="left-menu b-1 cursor">
      <div v-bind:class="[{'left-menu-item p-20 t-center cursor active':categoryId=='admin'}, {'left-menu-item p-20 t-center cursor bb-1':categoryId!='admin'}]">
        <router-link to="/admin-board/admin">user</router-link>
      </div>
      <div v-bind:class="[{'left-menu-item p-20 t-center cursor active':categoryId=='add-device'},{'left-menu-item p-20 t-center cursor bb-1':categoryId!='add-device'}]">
        <router-link to="/admin-board/add-device">device</router-link>
      </div>
      <div v-bind:class="[{'left-menu-item p-20 t-center cursor active':categoryId=='rent-list'},{'left-menu-item p-20 t-center cursor':categoryId!='rent-list'}]">
        <router-link to="/admin-board/rent-list">rent</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AdminViewVue from '@/views/AdminView.vue'
  export default {
    name: 'AdminSubmenu',
    computed: {
    categoryId () {
      return this.$route.params.category
    }
  }
  }
</script>

