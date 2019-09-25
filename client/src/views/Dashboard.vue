<template>
  <div class="Vue-component">
   <dashboardHeader></dashboardHeader>
   <dashboardBlockInfo :data="getBlockInfoData()"></dashboardBlockInfo>
   <dashboardChart></dashboardChart>
   <dashboardPaginationInfo :pageData="getPaginationData()"></dashboardPaginationInfo>
 </div>
</template>

<script>

  import PostsService from '@/services/PostsService'
  import { mapState } from 'vuex'

  export default {

    computed: mapState([
      'pageData'
      ]),

    components: {
      dashboardHeader: () => import('@/components/Dashboard-Header.vue'),
      dashboardBlockInfo: () => import('@/components/Dashboard-BlockInfo.vue'),
      dashboardChart: () => import('@/components/Dashboard-Chart.vue'),
      dashboardPaginationInfo: () => import('@/components/Dashboard-PaginationInfo.vue'),
    },

    created () {
      this.getPageData()
    },

    updated () {
      if (this.pageData[0].badRequest) this.$router.push("/errorPage")
    },

    mounted() {
      let googleChart = document.createElement('script')
      googleChart.setAttribute('src', 'https://www.gstatic.com/charts/loader.js')
      document.head.appendChild(googleChart)
    },

    watch: {
      '$route': 'getPageData'
    },

    methods: {
      async getPageData () {
        const {data} = await PostsService.fetchPageData(this.$route.params.id);
        this.$store.commit('getData', data);
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart(this.pageData));

        async function drawChart(data) {
          let arrChart = [['Date', 'Amount']];
          for (let i = 0; i < data[0].dataForChart.length; i++) {
            arrChart.push([`${JSON.stringify(data[0].dataForChart[i].date).substring(1, 11)}`,  data[0].dataForChart[i].sum]);
          }
          var data = google.visualization.arrayToDataTable(arrChart);
          var options = {
            title: 'Donation Statistics',
            curveType: 'function',
            legend: { position: 'bottom' }
          };

          var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

          chart.draw(data, options);
        }

      },

      getBlockInfoData () {
        return [
        ["Top Donator", this.pageData[0].maxAmount,this.pageData[0].topDonator],
        ["Last Month Amount",this.pageData[0].amountForThisMonth],
        ["All time amount",this.pageData[0].amount]
        ]
      },

      getPaginationData () {
        return this.pageData;
      }
    }
}
</script>
