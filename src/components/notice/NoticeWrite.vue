<template>
  <input type="hidden" name="notice_id" id="notice_id" value="notice_id" /> <!-- read일 경우만 바인딩 -->
  <input type="hidden" name="type" id="type" value="1" />
  <div class="main-content w-50 m-auto b-1 border-radius-3 p-30">
    <div class="article-write-wrap mb-20">
      <div class="article-info-wrap d-flex space-between bb-1 mb-10">
        <div class="article-info-left w-70 f-14">
          <span class="font-700 mr-5">제목</span>
          <input type="text" id="title" name="title" class="f-15 p-5 w-80" v-model="title" autofocus :readonly="categoryId == 'read'"/>
        </div>
        <div v-bind:class="[{'article-info-left f-14 w-25 t-right pt-5':categoryId=='write'}, {'article-info-left f-14 w-25 t-right pt-5 d-none':categoryId!='write'}]">
          <span class="font-700">공지사항</span>
          <input type="checkbox" id="category" name="category" class="f-15 p-5" v-model="category" />
        </div>
      </div>
      <div class="article-info-wrap d-flex space-between">
        <div class="article-info-left w-45 bb-1 mb-15 f-14">
          <span class="font-700 mr-5">작성자</span>
          <input type="text" id="wrtier" name="wrtier" class="f-15 p-5 w-80" v-model="wrtier" readonly/>
        </div>
        <div class="article-info-left w-45 bb-1 mb-15 f-14">
          <span class="font-700 mr-5">작성일</span>
          <input type="text" id="created_date" name="created_date" class="f-15 p-5 w-80" v-model="created_date" readonly/>
        </div>
      </div>
      <div class="article-write p-10 b-1 m-auto">
        <!-- <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" /> -->
        <textarea id="content" class="article-content p-5 f-14 w-95" v-model="content" maxlength="" tabindex="2" autofocus :readonly="categoryId == 'read'"/>
      </div>
    </div>
    <div class="btn-wrap t-center mb-20">
      <button v-bind:class="[{'active-btn':categoryId=='write'}, {'d-none':categoryId!='wrtie'}]" @click="postArticle({type, category, title, content})">등록</button>
      <!-- 아래 클래스 바인드에 유저 아이디와 작성자 아이디 일치 확인 추가하기 -->
      <button class="active-btn" v-on:click="toModify()">수정하기</button>
      <!-- <button v-bind:class="[{'active-btn':(categoryId=='read')}, {'d-none':categoryId!='read'}]" v-on:click="toModify()">수정하기</button> -->
      <button class="active-btn" @click="postArticle({type, title, content})">수정하기</button>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import axios from 'axios'
import router from '@/router'

export default {
  name: 'NoticeWrite',
  computed: {
    categoryId () {
      return this.$route.params.category
    }
  },
  data () {
  },
  methods: {
    postArticle (article_info) {
      // 카테고리 notice 강제로 박아주기 
      // if (article_info.category == true) article_info.category = 'category'
      if(type == 1) {
        article_info.category = 'category'
        article_info.user_id = '황민재'
      } else {
        article_info.notice_id = notice_id.value
      }
      // user_id 추가필요
      // articleObj.NAME = store.state.userInfo.NAME-

      // title, content 공백 체크
      if(article_info.title == null || article_info.content == null) alert("제목 또는 내용을 입력해주세요.")
      else {
        axios
        .post('http://133.186.212.200:8080/notice', article_info)
        .then((res) => {
          console.log(JSON.stringify(res))
          router.push({ path: '/notice-board/list'})
        })
        .catch((error) => {
          alert('등록에 오류가 발생하였습니다. 잠시 후 다시 시도하여주세요.')
        })
      }
   },
   toModify() {
     $("#title").val(title.value)
     $("#title").attr('readonly', false)
     $("#type").val(2)
     
     // notice_id 들어오면 바인딩 아래
    // $("#notice_id").val(notice_id.value)
     $("#content").val(content.value)
     $("#content").attr('readonly', false)

   }
  }
}
</script>

<style scoped>
td {
  padding: 10px;
}
.ck-editor__editable {
  height: 400px;
  font-size: 15px;
}
</style>
