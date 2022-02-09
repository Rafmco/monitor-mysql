<template>
  <v-container fluid>
    <line-chart
      :data="dados"
      :width="largura"
      :height="altura"
      :min="minValue"
      :max="maxValue"
      :xmin="minXValue"
      :xmax="maxXValue"
      :colors="colors"
      :stacked="false"
      discrete="false"
      :label="label"
      :xtitle="tituloX"
      :ytitle="tituloY"
      :curve="false"
      :legend="legend"
      :prefix="prefix"
      :suffix="suffix"
      thousands=""
      decimal=","
      precision="3"
      :zeros="false"
      :bytes="false"
      messages="{empty: 'No data'}"
      :download="false"
      :library="{
        title: {
          display: true,
          position: 'top',
          fontSize: 11,
          fontStyle: 'bold',
          text: titulo
        },
        elements: {
          point: {
            radius: radius
          }
        },
        tooltips: {
          enabled: true
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: 'lightgrey',
              drawOnChartArea: true,
              drawBorder: true,
              lineWidth: 1
            },
            ticks: {
              maxTicksLimit: xMaxTicksLimit
            },
            scaleLabel: {
              display: false,
              fontSize: 12,
              fontColor: '#F44336',
              labelString: 'Descrição do Eixo X'
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: 'lightgrey',
              drawOnChartArea: true,
              drawBorder: true,
              lineWidth: 1
            },
            ticks: {
              autoSkip: true,
              min: 0
            },
            scaleLabel: {
              display: false,
              fontSize: 12,
              fontColor: '#F44336',
              labelString: 'Descrição do Eixo Y'
            }
          }]
        }
      }"
    />
  </v-container>
</template>

<script>
export default {
  name: 'ComponenteChart',

  props: {
    dados: {
      required: true,
      type: Array
    },
    titulo: {
      default: '',
      type: String
    },
    largura: {
      default: null,
      type: String
    },
    altura: {
      // required: false,
      default: '',
      type: String
    },
    minValue: {
      default: null,
      type: String
    },
    maxValue: {
      default: null,
      type: String
    },
    minXValue: {
      default: null,
      type: String
    },
    maxXValue: {
      default: null,
      type: String
    },
    colors: {
      default: () => [],
      type: Array
    },
    label: {
      default: null,
      type: String
    },
    tituloX: {
      default: null,
      type: String
    },
    tituloY: {
      default: null,
      type: String
    },
    legend: {
      default: 'top',
      type: String
    },
    prefix: {
      default: null,
      type: String
    },
    suffix: {
      default: null,
      type: String
    },
    xMaxTicksLimit: {
      default: 36,
      type: Number
    },
    radius: {
      default: 0,
      type: Number
    }
  }
}
</script>
