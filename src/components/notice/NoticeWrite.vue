<template>
  <div class="main-content w-70 m-auto b-1 border-radius-3 p-30">
    <div class="article-write-wrap mb-20">
      <div class="article-title-wrap p-5 d-flex space-between">
        <div class="article-title-left p-5 w-70 bb-1 mb-15">
          <input type="text" class="f-15 p-5 w-90" v-model="TITLE" placeholder="제목을 입력해주세요." maxlength="50" tabindex="1" autofocus>
        </div>
        <div class="article-title-right p-5">
          <span class="f-14">공지사항</span>
          <input type="checkbox" id="is-notice-checkbox" class="f-14" v-model="IS_NOTICE">
        </div>
      </div>
      <div class="article-write p-10 b-1 m-auto">
        <textarea id="article-content" class="article-content p-5 f-14" v-model="CONTENTS" placeholder="내용을 입력해주세요." maxlength="" tabindex="2"/>
      </div>
    </div>
    <div class="btn-wrap t-center mb-20">
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
