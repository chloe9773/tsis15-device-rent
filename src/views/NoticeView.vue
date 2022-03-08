<template>
  <MenuBar/>
  <NoticeList v-if="categoryId == 'list'"/>
  <NoticeRead v-else-if="categoryId == 'read'"/>
  <NoticeWrite v-else-if="categoryId == 'write'"/>

</template>

<script>
import MenuBar from '@/components/MenuBar.vue'
import NoticeList from '@/components/notice/NoticeList.vue'
import NoticeRead from '@/components/notice/NoticeRead.vue'
import NoticeWrite from '@/components/notice/NoticeWrite.vue'

export default {
  computed: {
    categoryId () {
      return this.$route.params.category
    }
  },
  components: {
    MenuBar,
    NoticeList,
    NoticeRead,
    NoticeWrite
  }
}
</script>
