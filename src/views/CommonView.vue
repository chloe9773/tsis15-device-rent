<template>
<MenuBar/>
<DeviceList/>
<PageBtn/>
<DeviceDetail/>
</template>
<script>
import MenuBar from '@/components/MenuBar.vue'
import DeviceList from '@/components/DeviceList.vue'
import PageBtn from '@/components/table/PageBtn.vue'
import DeviceDetail from '@/components/DeviceDetail.vue'
export default {
  name: 'CommonView',
  components: {
    MenuBar,
    DeviceList,
    PageBtn,
    DeviceDetail
  }
}
</script>