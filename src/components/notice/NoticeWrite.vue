<template>
  <div class="main-content w-50 m-auto b-1 border-radius-3 p-30">
    <div class="article-write-wrap mb-20">
      <div class="article-info-wrap d-flex space-between bb-1 mb-10">
        <div class="article-info-left w-70 f-14">
          <span class="font-700 mr-5">제목</span>
          <!-- 제목 maxlength 50 -->
          <input type="text" id="title" name="title" class="f-15 p-5 w-80" v-model="title" maxlength="50" autofocus :readonly="categoryId == 'read'"/>
        </div>
        <div v-bind:class="[{'article-info-left f-14 w-25 t-right pt-5':categoryId=='write'}, {'article-info-left f-14 w-25 t-right pt-5 d-none':categoryId=='read'}]">
          <span class="font-700">공지사항</span>
          <input type="checkbox" id="category" name="category" class="f-15 p-5" v-model="category" />
        </div>
      </div>
      <div class="article-info-wrap d-flex space-between">
        <div class="article-info-left w-45 bb-1 mb-15 f-14">
          <span class="font-700 mr-5">작성자</span>
          <input type="text" id="writer" name="writer" class="f-15 p-5 w-80" v-model="writer" readonly/>
        </div>
        <div v-if="categoryId == 'read'" class="article-info-left w-45 bb-1 mb-15 f-14">
          <span class="font-700 mr-5">작성일</span>
          <input type="text" id="create_date" name="create_date" class="f-15 p-5 w-80" v-model="create_date" readonly/>
        </div>
      </div>
      <div class="article-write p-10 b-1 m-auto">
        <textarea id="content" class="article-content p-5 f-14 w-95" v-model="content" maxlength="" tabindex="2" autofocus :readonly="categoryId == 'read'"/>
      </div>
    </div>
    <div v-if="categoryId == 'write'" class="btn-wrap t-center mb-20">
      <button class="active-btn" @click="postNotice()">등록</button>
      <button class="cancel-btn" @click="goPreviousPage()">취소</button>
    </div>
    <div v-if="categoryId == 'read'" class="btn-wrap t-center mb-20">
      <button class="active-btn" @click="goPreviousPage()">글목록</button>
      <button class="active-btn" @click="goWritePage(purpose='write')">글쓰기</button>
      <!-- 수정/삭제는 admin 권한이 있는 사람만 가능 (admin 권한이 있으면 다른사람이 쓴 글도 수정/삭제 가능)-->
      <button v-if="role == 1" class="active-btn" @click="goWritePage(purpose='update')">수정</button>
      <button v-if="role == 1" class="active-btn" @click="deletePost()">삭제</button>
    </div>
  </div>
  <p> - for test -</p>
  <p>>>> categoryId : {{ categoryId }}</p>
  <p>>>> Auth level(aka "ROLE") : {{ role }}</p>
  <p>>>> typeof role : {{ typeof role }}</p>
  <p>>>> $store.state.articleInfo : </p>
  <p>{{ JSON.stringify($store.state.articleInfo) }}</p>
  <p>>>> value of checkbox : {{ category }}</p>
  <p>>>> typeof category : {{ typeof category }}</p>
  <p>>>>  is category null? : {{ category === null  }}</p>
  <p>>>>  category == '' : {{ category == '' }}</p>
  <br/>
  <br/>
  <p>★ post(create,update) 요청시 필요한 값 5가지</p>
  <p>>>> title : {{ title }}</p>
  <p>>>> category : {{ category }}</p>
  <p>>>> writer : {{ writer }}</p>
  <p>>>> content : {{ content }}</p>
  <p>>>> notice_id : {{ notice_id }}</p>
  <br/>
  <br/>
  <p>>>> create_date : {{ create_date }}</p>
</template>

<script>
import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { mapActions } from 'vuex'

export default {
  name: 'NoticeWrite',
  data () {
    return {
      title: '',
      category: '',
      writer: '',
      create_date: '',
      content: '',
      notice_id: ''
    }
  },
  computed: {
    categoryId () {
      return this.$route.params.category
    },
    // 로그인한 계정의 권한
    role() {
      return store.state.userInfo.ROLE
    }
  },
  methods: {
    ...mapActions(['storeArticleInfo', 'removeArticleInfo']),
    postNotice () {
      let noticeInfoObj = {
        title: this.title,
        user_id: this.writer,
        // category: 'normal',
        category: 'notice', // 현재는, 모든 글을 '공지사항'으로 처리하도록 구현
        content: this.content,
        notice_id: this.notice_id
      }
      // if (this.category === true)
      //   noticeInfoObj.category = 'notice'

      if (noticeInfoObj.title === null || noticeInfoObj.title == '') {
        alert("제목을 입력해주세요.")
      } else if (noticeInfoObj.content === null || noticeInfoObj.content == '') {
        alert("내용을 입력해주세요.")
      } else {
      axios
        .post('http://133.186.212.200:8080/notice/', noticeInfoObj)
        .then((res) => {
          console.log(JSON.stringify(res))
          this.$router.push({ name: 'notice-board', params: { category: 'list' } })
        })
        .catch(() => {
          alert("글쓰기/수정 에러")
        })
      }
    },
    deletePost() {
      axios
        .delete(`http://133.186.212.200:8080/notice/${this.notice_id}`)
        .then((res) => {
          console.log(JSON.stringify(res))
          this.$router.push({ name: 'notice-board', params: { category: 'list' } })
        })
        .catch(() => {
          alert("글 삭제 에러")
        })
    },
    goPreviousPage () {
      this.$router.push({ name: 'notice-board', params: { category: 'list' } })
    },
    goWritePage (purpose) {
      // 'write'(새 글 등록)일 때만 값 초기화
      if (purpose == 'write') {
        this.removeArticleInfo()
        this.title = ''
        this.category = ''
        this.writer = store.state.userInfo.NAME
        this.create_date = ''
        this.content = ''
        this.notice_id = ''
      }
      this.$router.push({
        name: 'notice-board',
        params: {
          category: 'write',
        }
      })
    }
  //   postArticle (article_info) {
  //     // 카테고리 notice 강제로 박아주기 
  //     // if (article_info.category == true) article_info.category = 'category'
  //     if(type == 1) {
  //       article_info.category = 'notice'
  //       article_info.user_id = '홍길동'
  //     } else {
  //       article_info.notice_id = notice_id.value
  //     }
  //     // user_id 추가필요
  //     // articleObj.NAME = store.state.userInfo.NAME-

  //     // title, content 공백 체크
  //     if(article_info.title == null || article_info.content == null) alert("제목 또는 내용을 입력해주세요.")
  //     else {
  //       axios
  //       .post('http://133.186.212.200:8080/notice', article_info)
  //       .then((res) => {
  //         console.log(JSON.stringify(res))
  //         router.push({ path: '/notice-board/list'})
  //       })
  //       .catch((error) => {
  //         alert('등록에 오류가 발생하였습니다. 잠시 후 다시 시도하여주세요.')
  //       })
  //     }
  //  },

  //  toModify() {
  //    $("#title").val(title.value)
  //    $("#title").attr('readonly', false)
  //    $("#type").val(2)
     
  //    // notice_id 들어오면 바인딩 아래
  //   // $("#notice_id").val(notice_id.value)
  //    $("#content").val(content.value)
  //    $("#content").attr('readonly', false)

  //  }
  },
  mounted () {
    this.title = store.state.articleInfo.title
    this.category = store.state.articleInfo.category
    if (this.$route.params.category == 'read') {
      this.writer = store.state.articleInfo.user_id
    } else if (this.$route.params.category == 'write') {
      this.writer = store.state.userInfo.NAME
    } else {
      alert('페이지 오류(category)')
      this.removeArticleInfo()
      this.$router.push({ name: 'notice-board', params: { category: 'list' } })
    }
    this.create_date = store.state.articleInfo.create_date.slice(0, 10)
    this.content = store.state.articleInfo.content
    this.notice_id = store.state.articleInfo.notice_id
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