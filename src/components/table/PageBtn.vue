<template>
  <div class="page-wrap f-12 t-center mt-20">
    <span v-if="currPage == 1" class="pg-btn p-5 disable">
      처음으로
    </span>
    <span v-else class="pg-btn p-5" @click="$emit('getDataByBtn', 1, keyword)">
      처음으로
    </span>
    <span v-if="currPage == 1" class="pg-btn disable">
      이전
    </span>
    <span v-else class="pg-btn" @click="$emit('getDataByBtn', currPage - 1, keyword)">
      이전
    </span>
    <span class="pg-num-wrap"
      :key="index"
      v-for="(page_num,index) in pageList"
      @click="$emit('getDataByBtn', page_num, keyword)">
      <span v-if="page_num == currPage" class="pg-btn active">
        {{page_num}}
      </span>
      <span v-else class="pg-btn">
        {{page_num}}
      </span>
    </span>
    <span v-if="currPage == pages" class="pg-btn disable">
      다음
    </span>
    <span v-else class="pg-btn" @click="$emit('getDataByBtn', currPage + 1, keyword)">
      다음
    </span>
    <span v-if="currPage == pages" class="pg-btn disable">
      끝으로
    </span>
    <span v-else class="pg-btn" @click="$emit('getDataByBtn', pages, keyword)">
      끝으로
    </span>
  </div>
</template>
<script>
export default {
  props: {
    pageList: Array,
    currPage: Number,
    keyword: String,
    pages: Number
  },
  emits: ['getListBySearchBtn']
}
</script>
