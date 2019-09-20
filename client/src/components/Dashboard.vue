
<template>
  <div class="Vue-component">
   <div class="Donating__header">
    <div class="container">
      <div class="row Donating__row-of-header">
        <div class="col-2">
           <router-link to="/page=1" class="Donating__link">Dashboard</router-link>
        </div>
        <div class="col-2">
          <a href="./donate" class="Donating__link">
            Donate
          </a>
        </div>
      </div>
    </div>
  </div> 
  <div class="container">
    <div class="row Donating__information-section">
      <div class="col-4">
        <div class="Donating__information-block first-block">
          <p class="Donating__block-headline">Top Donator</p>
          <p class="Donating__block-price">$ {{pageData[0].maxAmount}}</p>
          <p class="Donating__block-person">{{pageData[0].topDonator}}</p>
        </div>
      </div>
      <div class="col-4">
        <div class="Donating__information-block second-block">
          <p class="Donating__block-headline">Last Month Amount</p>
          <p class="Donating__block-price">$ {{pageData[0].amountForThisMonth}}</p>
        </div>
      </div>
      <div class="col-4">
        <div class="Donating__information-block third-block">
          <p class="Donating__block-headline">All time amount</p>
          <p class="Donating__block-price">${{pageData[0].amount}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid Donating__container-chart">
    <div id="curve_chart" class="Donating__chart"></div>
  </div>
  <div class="container-fluid">
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
      <ul v-if="pageData[0].pages > 0" class="pagination text-center">
        <li v-if="pageData[0].current == 1" class="disabled"><a>First</a></li>
        <li v-else><a href="/page=1">First</a></li>
        <li v-if="paginationIterator !== 1" class="disabled"><a>...</a></li>
        <template v-if="paginationIterator <= (Number(pageData[0].current) + 4) && paginationIterator <= pageData[0].pages">
          <template v-for="i in pageData[0].pages">
            <li v-if="paginationIterator == pageData[0].current" class="active"><a>{{paginationIterator}}</a></li>
            <li v-else><a href="page=<%= i %>">{{paginationIterator}}</a></li>
            <li v-if="paginationIterator == Number(pageData[0].current) + 4 && paginationIterator < pageData[0].pages" class="disabled"><a>...</a></li>
          </template>
        </template>
        <li v-if="pageData[0].current == pageData[0].pages" class="disabled"><a>Last</a></li>
        <li v-else><a href="page=<%= pages %>">Last</a></li>
      </ul>
    </div>
  </div>
</div>

</template>




<script>

  import PostsService from '@/services/PostsService'
  import { mapState } from 'vuex'

  export default {
    // loadDashboardPage: false,
    computed: mapState([
      'pageData',
      'paginationIterator'
      ]),

    data () {
      return {
        // paginationIterator: null
      }
    },

    created () {
      this.getPageData()
    },

    watch: {
      '$route': 'getPageData'
    },

    methods: {
      async getPageData () {
        const {data} = await PostsService.fetchPageData(this.$route.params.id);
        this.$store.commit('getData', data);
        const iterator = (Number(this.pageData[0].current) > 5 ? Number(this.pageData[0].current) - 4 : 1);
        this.$store.commit('getPaginationIterator', iterator)
      },
    }
  }

  // chart script start
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    // var data = google.visualization.arrayToDataTable([
    //   ['Date', 'Amount'],
    //   <% for (let i = 0; i < dataForChart.length; i++) { %>
    //     ['<%= JSON.stringify(dataForChart[i].date).substring(1, 11);%> <%= JSON.stringify(dataForChart[i].date).substring(12, 20);%>',  <%=dataForChart[i].sum%>],
    //     <% } %>
    //     ]);

    var options = {
      title: 'Donation Statistics',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }
// chart script end
</script>

<style scoped>
.Vue-component {
  word-wrap: break-word;
}

.Donating__header {
  padding: 10px;
  background-color: #ee6e73;
}

.Donating__row-of-header {
  justify-content: flex-end;
}

.Donating__link {
  display: block;
  text-align: center;
  padding: 10px;
  color: white;
}
.Donating__link:hover {
  opacity: .5;
  color: white;
  text-decoration: none;
}

.Donating__information-section {
  padding-top: 50px;
}

.Donating__information-block {
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  box-shadow: 10px 5px 5px silver;
  height: 166px;
  padding: 20px;
}
.Donating__information-block > * {
  color: white;
}
.Donating__information-block > p:not(:last-child) {
  margin-bottom: 6px;
}

.Donating__information-block.first-block {
  background-color: #4caf50;
}

.Donating__information-block.second-block {
  background-color: #9c27b0;
}

.Donating__information-block.third-block {
  background-color: #607d8b;
}

.Donating__block-headline,
.Donating__block-person {
  font-size: 16px;
}

.Donating__block-price {
  font-size: 30px;
}

.Donating__block-price {
  font-size: 30px;
}

.Donating__tb-col:nth-child(1),
.Donating__tb-col:nth-child(5) {
  width: 25%;
}

.Donating__tb-col:nth-child(2),
.Donating__tb-col:nth-child(4) {
  width: 20%;
}

.Donating__tb-col:nth-child(3) {
  width: 10%;
}

.Donating__tb-col.headline {
  font-weight: bold;
}

.Donating__tb-col {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  align-items: center;
}

.Donating__table {
  width: 100%;
  padding: 40px 20px;
}

.Donating__main-info {
  padding: 40px 20px 18px;
}

.Donating__tb-row {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  padding: 10px 0;
}

.Donating__tb-row:not(:first-child) {
  border-top: 1px solid silver;
}

.Donating__tb-row:last-child {
  border-bottom: 1px solid silver;
}

.Donating__pagination {
  display: flex;
  justify-content: center;
}

.Donating__pagination li {
  font-size: 20px;
  margin: 0 7px;
}

.Donating__pagination li.active {
  color: lightgreen;
}

.Donating__pagination li.active {
  color: lightgreen;
}

.Donating__pagination li:first-child {
  margin-left: 0;
}

.Donating__pagination li:last-child {
  margin-right: 0;
}

.Donating__container-chart {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
}
.Donating__chart {
  width: 100%;
  height: 400px;
}
</style>

