<!-- 어드민 보드 - 서브 메뉴 - 디바이스 추가 -->
<template>
    <DeviceDetailLog v-if="openToggle === true" v-bind:item="info"/>
    <div class="right-content b-1 p-35 w-60 border-radius-2">
        <TableTop>
            <template #table-top-select>
                <select class="p-5 w-20" id="select" name="select" v-model="keyword">
                    <option v-for="opt in searchKey" :value="opt.value" v-bind:key="opt" :selected="opt.value === 'user_id'">{{opt.text}}</option>
                </select>
            </template>
            <template #table-top-search>
                <div class="input-wrap p-5 b-1 w-70 pos-r">
                <input type="text" name="search-word" id="search-word" class="pos-a"  style="top:24%"/>
                <button class="float-r mr-5 cancel-btn" v-on:click="getSearch(keyword)">검색</button>
                </div>
            </template>
        </TableTop>
        <div class="table-wrap">
            <table class="table w-100" id="device-list-table">
                <thead class="f-14 font-700 bb-2 bt-2">
                    <th class="p-20">종류</th>
                    <th class="v-middle">브랜드</th>
                    <th class="v-middle">단말기명</th>
                    <th class="v-middle">대여 현황</th>
                </thead>
                <tbody class="f-13 t-center" id="ttt">
                <tr :key="index" v-for="(item,index) in list" class="bb-1 cursor tabletr" v-on:click="getLogs(item);">
                    <td class="w-15" id="category" >{{item.category}}</td>
                    <td class="w-15" id="brand" >{{item.brand}}</td>
                    <td id="name" >{{item.name}}</td>
                    <td class="w-25 grn" id="status"> {{item.status}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import TableTop from '@/components/table/TableTop.vue'
import DeviceDetailLog from '@/components/admin/DeviceDetailLog.vue'

export default {
  name: 'AdminView',
  created: function(){
    this.axios
        .get('/item/paging/1')
        .then((res) => {
            console.log(res)
            this.list = res.data.list
        }).catch((res) => {
            console.log(res)
        })
  },
  components: {
    DeviceDetailLog,
    TableTop
  },
  data() {
    return {
      searchKey: [
        {
          text: "단말기명",
          value: "user_id"
        },
        {
          text: "성명",
          value: "name"
        },
        {
          text: "부서명",
          value: "dept_name"
        }
      ],
      list: [],
      selected: [],
      slides: document.getElementsByClassName('tabletr'),
      item_id: [],
      serialnum: [],
      name: [],
      brand: [],
      category: [],
      status: [],
      pagnum: 1,
      slist: [],
      test: [],
      keyword: "",
      openToggle: false,
      info: {}
    }
  },
  methods: {
    getLogs(device_info) {
      this.info = device_info;
      this.openToggle = true
    }
  }
}
</script>
