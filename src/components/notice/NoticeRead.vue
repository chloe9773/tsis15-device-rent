<template>
  <div class="main-content w-70 m-auto">
    <div class="article-wrap b-1 mb-20 p-10">
      <div class="article-title-wrap d-flex">
        <div class="article-title p-10 f-15 font-700">제목</div>
        <input type="text" id="title" name="title" class="artcile-title-input w-80" value="" tabindex="1" autofocus readonly/>
      </div>
      <div class="article-second-layer d-flex">
        <div class="article-writer-wrap d-flex">
          <div class="article-writer p-10 f-15 font-700">작성자</div>
          <input type="text" id="writer" name="writer" class="artcile-writer-input" value="" readonly/>
        </div>
        <div class="article-created-date-wrap d-flex">
          <div class="article-created-date p-10 f-15 font-700">작성일</div>
          <input type="text" name="created_date" id="created_date" class="artcile-created-date-input" readonly/>
        </div>
      </div>
      <div class="article-content-wrap d-flex">
        <div class="article-content-title p-10 f-15 font-700">내용</div>
        <div class="article-content p-10 w-80">
          <textarea name="content" id="content" cols="30" rows="10" tabindex="2" readonly></textarea>
        </div>
      </div>
    </div>
    <div class="btn-wrap t-center d-none">
      <button class="active-btn">수정</button>
    </div>
  </div>
</template>
<script>
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
      this.axios
        .get(`/document/${noticeId}`)
        .then((res) => {
          this.title = JSON.stringify(res.data.TITLE)
          this.name = JSON.stringify(res.data.NAME)
          this.created_date = JSON.stringify(res.data.CREATED_DATE)
          this.content = JSON.stringify(res.data.CONTENT)
          this.category = JSON.stringify(res.data.CATEGORY)
        })
        .catch(() => {
          alert('글 읽기 오류')
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
