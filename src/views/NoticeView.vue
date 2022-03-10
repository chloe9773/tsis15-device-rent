<template v-if="categoryId != 'list' && categoryId == 'read' && categoryId == 'write'">
  <MenuBar/>
  <NoticeList v-if="categoryId == 'list'"/>
  <NoticeWrite v-if="categoryId == 'read' || categoryId == 'write'"/>
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
  },
  mounted () {
    // 예외처리 : categoryId가 'read' or 'write'가 아닌 경우
    if (this.$route.params.category != 'list' && this.$route.params.category != 'read' && this.$route.params.category != 'write') {
      alert('없는 페이지 입니다.')
      this.$router.go(-1)
    }
  }
}
</script>
