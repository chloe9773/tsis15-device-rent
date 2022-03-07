<template>
  <MenuBar/>
  <!-- <NoticeList v-if="categoryId == 'list'"/>
  <NoticeRead v-else-if="categoryId == 'read'"/>
  <NoticeWrite v-else/> -->
  <NoticeList v-if="categoryId == undefined "/>
  <NoticeRead v-else-if="categoryId == 'read'"/>
  <NoticeWrite v-else-if="categoryId == 'write'"/>
  <!-- <NoticeList v-if="$route.path == '/notice-board'"/>
  <NoticeRead v-else-if="$route.path == '/notice-board-read'"/>
  <NoticeWrite v-else/> -->
  <!-- $route.path == '/notice-board-write' -->

</template>

<script>
import MenuBar from '@/components/MenuBar.vue'
import NoticeList from '@/components/NoticeList.vue'
import NoticeRead from '@/components/NoticeRead.vue'
import NoticeWrite from '@/components/NoticeWrite.vue'

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
