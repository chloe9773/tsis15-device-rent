<!-- 좌측 서브 메뉴 (어드민 권한 관리, 디바이스 추가, 임대장부 관리 페이지) 컴포넌트 분리 -->
<template>
  <MenuBar/>
  <div class="main-content-admin d-flex">
    <AdminSubmenu/>
    <AdminAuthTable v-if="categoryId == 'admin'"/>
    <AddDevice v-if="categoryId == 'add-device'"/>
    <AdminDeviceTable v-if="categoryId == 'rent-list'"/>
  </div>
    <!-- <AdminTable v-if="isDevice == 'device'"/> -->
    <!-- <AdminTable v-if="getCategory() == 'device'" :device='device.data'/> -->
  <!-- </div> -->
</template>
<script>
// import { useRoute } from 'vue-router'
import MenuBar from '@/components/MenuBar.vue'
import AdminSubmenu from '@/components/admin/AdminSubmenu.vue'
import AdminAuthTable from '@/components/admin/AdminAuthTable.vue'
import AddDevice from '@/components/admin/AddDevice.vue'
import AdminDeviceTable from '@/components/admin/AdminDeviceTable.vue'

// 라우터 파람 출력
export default {
  created() {
    // if(this.$cookies.get("user_id") == undefined || this.$cookies.get("user_id") == null || this.$cookies.get("user_id") == "") this.$router.push("/")
    if(this.$cookies.get("user_role") < 1) this.$router.push("/")
    else console.log(this.$cookies.get("user_id"))
  },
  computed: {
    categoryId () {
      return this.$route.params.category
    }
  },
  components: {
    MenuBar,
    AdminSubmenu,
    AdminAuthTable,
    AddDevice,
    AdminDeviceTable
  }
}
</script>

<style lang="css">
  @import url("@/assets/css/admin.css");
</style>
