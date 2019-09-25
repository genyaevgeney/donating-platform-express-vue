<template>
  <div class="container-fluid Dashboard-pagination">
    <div class="Donating__main-info">
      <table class="Donating__table">
        <tr class="Donating__tb-row main">
          <td class="Donating__tb-col headline">Donator Name</td>
          <td class="Donating__tb-col headline">Email</td>
          <td class="Donating__tb-col headline">Amount</td>
          <td class="Donating__tb-col headline">Message</td>
          <td class="Donating__tb-col headline">Date</td>
        </tr>
        <tr v-for="donation in pageData[0].donations" class="Donating__tb-row main">
          <td class="Donating__tb-col">{{donation.volunteer_name}}</td>
          <td class="Donating__tb-col">{{donation.email}}</td>
          <td class="Donating__tb-col">{{donation.amount}}</td>
          <td class="Donating__tb-col">{{donation.message}}</td>
          <td class="Donating__tb-col">{{JSON.stringify(donation.date).substring(1, 11)}}  {{JSON.stringify(donation.date).substring(12, 20)}}</td>
        </tr>
      </table>
    </div>
    <div class="Donating__pagination">
      {{createIterator()}}
      <ul v-if="pageData[0].pages > 0" class="pagination text-center">
        <li v-if="pageData[0].current == 1" class="disabled"><span>First</span></li>
        <li v-else><router-link to="/page=1">First</router-link></li>
        <li v-if="iterator !== 1" class="disabled"><span>...</span></li>
        <template v-for="i in pageData[0].pages">
          <template v-if="iterator <= (Number(pageData[0].current) + 4) && iterator <= pageData[0].pages">
            <li v-if="iterator == pageData[0].current" class="active"><span>{{iterator}}</span></li>
            <li v-else><router-link :to="'page=' + iterator">{{iterator}}</router-link></li>
            <li v-if="iterator == Number(pageData[0].current) + 4 && iterator < pageData[0].pages" class="disabled"><span>...</span></li>
            {{incrementIterator()}}
          </template>
        </template>
        <li v-if="pageData[0].current == pageData[0].pages" class="disabled"><span>Last</span></li>
        <li v-else><router-link :to="'page=' + pageData[0].pages">Last</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props:['pageData'],

    methods: {
      incrementIterator () {
        this.iterator++
      },

      createIterator () {
        this.iterator = (Number(this.pageData[0].current) > 5 ? Number(this.pageData[0].current) - 4 : 1);
      }
    }
  }
</script>
