<template>
  <div class="main-content w-70 m-auto">
    <div class="article-write-wrap b-1 mb-20">
      <div class="article-title-wrap p-5 d-flex space-between">
        <input
          type="text"
          class="f-15 p-5 w-60"
          v-model="TITLE"
          placeholder="제목"
          maxlength=""
          autofocus>
        <div class="article-title-right p-5">
          <span class="f-14">공지사항</span>
          <input type="checkbox" id="is-notice-checkbox" v-model="IS_NOTICE">
        </div>
      </div>
      <div class="article-write">
        <input v-model="CONTENTS" placeholder="내용"/>
      </div>
    </div>
    <div class="btn-wrap t-center">
      <button class="active-btn" @click="postArticle({ IS_NOTICE, TITLE, CONTENTS })">등록</button>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import axios from 'axios'
import router from '@/router'

export default {
  name: 'NoticeWrite',
  data () {
  },
  methods: {
    postArticle (articleObj) {
      articleObj.NAME = store.state.userInfo.NAME
      axios
        .post('http://133.186.212.200:8080/notice', articleObj)
        .then((res) => {
          console.log(JSON.stringify(res))
          router.push({ name: 'notice-board' })
        })
        .catch(() => {
          alert('글 쓰기 오류')
        })
    }
  }
}
</script>

<style>
td {
  padding: 10px;
}
.ck-editor__editable {
  height: 400px;
  font-size: 15px;
}
</style>
