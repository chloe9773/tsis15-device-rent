<!-- 어드민 보드 좌측 서브메뉴 컴포넌트 -->
<template>
  <div class="left-menu-wrap w-10 mr-70">
    <div class="left-menu b-1 cursor">
      <!-- <div v-bind:class="[{'d-none': role < 3}, {'p-20 menu cursor': role >= 3}]"> -->
        <div v-bind:class="[{'left-menu-item p-20 t-center cursor active':categoryId=='admin'}, {'left-menu-item p-20 t-center cursor bb-1':categoryId!='admin'}]">
          <router-view :key="$route.fullPath">
            <router-link to="/admin-board/admin">user</router-link>
          </router-view>
        </div>
      <!-- </div> -->
      <div v-bind:class="[{'left-menu-item p-20 t-center cursor active':categoryId=='add-device'},{'left-menu-item p-20 t-center cursor bb-1':categoryId!='add-device'}]">
        <router-view :key="$route.fullPath">
          <router-link to="/admin-board/add-device">device</router-link>
        </router-view>
      </div>
      <div v-bind:class="[{'left-menu-item p-20 t-center cursor active':categoryId=='rent-list'},{'left-menu-item p-20 t-center cursor':categoryId!='rent-list'}]">
        <router-view :key="$route.fullPath">
          <router-link to="/admin-board/rent-list">rent</router-link>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AdminViewVue from '@/views/AdminView.vue'
  export default {
    name: 'AdminSubmenu',
    crerated() {
      if(this.$cookies.get('user_role') != undefined || this.$cookies.get('user_role') != null || this.$cookies.get('user_role') != "") this.role = this.$cookies.get('user_role')
    },
    data() {
      return {
        role: 0
      }
    },
    computed: {
    categoryId () {
      return this.$route.params.category
    }
  }
  }
</script>

