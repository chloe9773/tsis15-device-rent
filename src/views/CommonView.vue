<template>
<MenuBar/>
<DeviceList/>
</template>
<script>
import MenuBar from '@/components/MenuBar.vue'
import DeviceList from '@/components/DeviceList.vue'

export default {
  name: 'CommonView',
  components: {
    MenuBar,
    DeviceList
  }
}
</script>
