<!-- 어드민 보드 - 서브 메뉴 - 디바이스 추가 -->
<template>
    <div class="right-content b-1 p-35 w-60 border-radius-2">
        <TableTop />
        <div class="table-wrap">
            <table class="table w-100">
                <thead class="f-14 font-700 bb-2 bt-2">
                    <th class="p-20"></th>
                    <th class="v-middle">임대시작일</th>
                    <th class="v-middle">부서</th>
                    <th class="v-middle">관리</th>
                    <th class="v-middle">임대종료일</th>
                    <th class="v-middle">부서</th>
                    <th class="v-middle">관리</th>
                </thead>
                <tbody class="f-13 t-center">
                    <tr class="bb-1" onclick="">
                        <td class="w-5">1</td>
                        <td class="w-15">2022/02/17</td>
                        <td>손보어쩌고저쩌고</td>
                        <td class="w-10">황민재</td>
                        <td class="w-15">2022/02.27</td>
                        <td>기획관리웅앵</td>
                        <td class="w-10">임건호</td>
                    </tr>
                    <tr class="bb-1">
                        <td class="w-5">2</td>
                        <td class="w-15">2022/02/17</td>
                        <td>손보어쩌고저쩌고</td>
                        <td class="w-10">황민재</td>
                        <td class="w-15">2022/02.27</td>
                        <td>기획관리웅앵</td>
                        <td class="w-10">임건호</td>
                    </tr>
                    <tr class="bb-1">
                        <td class="w-5">3</td>
                        <td class="w-15">2022/02/17</td>
                        <td>손보어쩌고저쩌고</td>
                        <td class="w-10">황민재</td>
                        <td class="w-15">2022/02.27</td>
                        <td>기획관리웅앵</td>
                        <td class="w-10">임건호</td>
                    </tr>
                    <tr class="bb-1">
                        <td class="w-5">4</td>
                        <td class="w-15">2022/02/17</td>
                        <td>손보어쩌고저쩌고</td>
                        <td class="w-10">황민재</td>
                        <td class="w-15">2022/02.27</td>
                        <td>기획관리웅앵</td>
                        <td class="w-10">임건호</td>
                    </tr>
                    <tr class="bb-1">
                        <td class="w-5">5</td>
                        <td class="w-15">2022/02/17</td>
                        <td>손보어쩌고저쩌고</td>
                        <td class="w-10">황민재</td>
                        <td class="w-15">2022/02.27</td>
                        <td>기획관리웅앵</td>
                        <td class="w-10">임건호</td>
                    </tr>
                    <tr class="bb-1">
                        <td class="w-5">6</td>
                        <td class="w-15">2022/02/17</td>
                        <td>손보어쩌고저쩌고</td>
                        <td class="w-10">황민재</td>
                        <td class="w-15">2022/02.27</td>
                        <td>기획관리웅앵</td>
                        <td class="w-10">임건호</td>
                    </tr>
                    <tr class="bb-1">
                        <td class="w-5">7</td>
                        <td class="w-15">2022/02/17</td>
                        <td>손보어쩌고저쩌고</td>
                        <td class="w-10">황민재</td>
                        <td class="w-15">2022/02.27</td>
                        <td>기획관리웅앵</td>
                        <td class="w-10">임건호</td>
                    </tr>
                    <tr class="bb-1">
                        <td class="w-5">8</td>
                        <td class="w-15">2022/02/17</td>
                        <td>손보어쩌고저쩌고</td>
                        <td class="w-10">황민재</td>
                        <td class="w-15">2022/02.27</td>
                        <td>기획관리웅앵</td>
                        <td class="w-10">임건호</td>
                    </tr>
                    <tr class="bb-1">
                        <td class="w-5">9</td>
                        <td class="w-15">2022/02/17</td>
                        <td>손보어쩌고저쩌고</td>
                        <td class="w-10">황민재</td>
                        <td class="w-15">2022/02.27</td>
                        <td>기획관리웅앵</td>
                        <td class="w-10">임건호</td>
                    </tr>
                    <tr class="bb-1">
                        <td class="w-5">10</td>
                        <td class="w-15">2022/02/17</td>
                        <td>손보어쩌고저쩌고</td>
                        <td class="w-10">황민재</td>
                        <td class="w-15">2022/02.27</td>
                        <td>기획관리웅앵</td>
                        <td class="w-10">임건호</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import TableTop from '@/components/table/TableTop.vue'
export default {
  name: 'AdminView',
  components: {
    TableTop
  }
}
</script>
