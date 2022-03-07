<template>
  <div class="main-content w-70 m-auto">
    <div class="article-wrap b-1 mb-20 p-10">
      <div class="article-title-wrap d-flex">
        <div class="article-title p-10 f-15 font-700">제목</div>
        <!-- <input type="text" class="artcile-title-input w-80" /> -->
        <div class="artcile-title p-10 f-15 font-700 w-80">{{ title }}</div>
      </div>
      <div class="article-second-layer d-flex">
        <div class="article-writer-wrap d-flex">
          <div class="article-writer p-10 f-15 font-700">작성자</div>
          <!-- <input type="text" class="artcile-writer-input" /> -->
          <div class="artcile-title p-10 f-15 font-700 w-80">{{ name }}</div>
        </div>
        <div class="article-created-date-wrap d-flex">
          <div class="article-created-date p-10 f-15 font-700">작성일</div>
          <!-- <input type="text" class="artcile-created-date-input" /> -->
          <div class="artcile-title p-10 f-15 font-700 w-80">{{ created_date }}</div>
        </div>
      </div>
      <div class="article-content-wrap d-flex">
        <div class="article-content-title p-10 f-15 font-700">내용</div>
        <div class="article-content p-10 w-80">
          <!-- <textarea name="" id="" cols="30" rows="10"></textarea> -->
          <div class="artcile-title p-10 f-15 font-700 w-80">{{ content }}</div>
        </div>
      </div>
    </div>
    <div class="btn-wrap t-center d-none">
      <button class="active-btn">수정</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'NoticeRead',
  data () {
    return {
      title: '',
      name: '',
      created_date: '',
      content: '',
      category: ''
    }
  },
  methods: {
    getArticle (noticeId) {
      axios
        .get(`http://133.186.212.200:8080/document/${noticeId}`)
        .then((res) => {
          this.title = JSON.stringify(res.data.TITLE)
          this.name = JSON.stringify(res.data.NAME)
          this.created_date = JSON.stringify(res.data.CREATED_DATE)
          this.content = JSON.stringify(res.data.CONTENT)
          this.category = JSON.stringify(res.data.CATEGORY)
        })
        .catch(() => {
          console.log('글 읽기 오류')
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
