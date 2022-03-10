<template>
  <div class="page-wrap f-12 t-center mt-20">
    <span v-if="currPage == 1" class="pg-btn p-5 disable">
      처음으로
    </span>
    <span v-else class="pg-btn p-5" @click="$emit('getDataByBtn', classification, keyword, 1, searchCategoryOptionValue)">
      처음으로
    </span>
    <span v-if="currPage == 1" class="pg-btn disable">
      이전
    </span>
    <span v-else class="pg-btn" @click="$emit('getDataByBtn', classification, keyword, currPage - 1, searchCategoryOptionValue)">
      이전
    </span>
    <span class="pg-num-wrap"
      :key="index"
      v-for="(page_num,index) in pageList"
      @click="$emit('getDataByBtn', classification, keyword, page_num, searchCategoryOptionValue)">
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
    <span v-else class="pg-btn" @click="$emit('getDataByBtn', classification, keyword, currPage + 1, searchCategoryOptionValue)">
      다음
    </span>
    <span v-if="currPage == pages" class="pg-btn disable">
      끝으로
    </span>
    <span v-else class="pg-btn" @click="$emit('getDataByBtn', classification, keyword, pages, searchCategoryOptionValue)">
      끝으로
    </span>
  </div>
</template>
<script>
export default {
  props: {
    classification : String,
    keyword: String,
    pages: Number,
    searchCategoryOptionValue: String,
    pageList: Array,
    currPage: Number
  },
  emits: ['getListBySearchBtn']
}
</script>
