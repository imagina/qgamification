<template>
  <div id="gamificationActivityCardImage">
    <div class="row q-col-gutter-md">
      <div v-for="(activity, keyActivity) in activities" :key="keyActivity" class="col-6 col-lg-4 col-xl-3">
        <div class="cardImageActivity cursor-pointer over-effect"
             @click="eventBus.emit('open.gamification.activity', activity)">
          <!-- Image -->
          <div :style="`background-image: url('${activity.mediaFiles?.mainimage.mediumThumb}')`"
               class="img-as-bg cardImage q-mb-sm"/>
          <!-- Text -->
          <div class="text-blue-grey text-body2 text-bold text-center"> {{ activity.title }}</div>
          <div class="text-caption text-blue-grey text-center" v-html="activity.description"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from 'src/plugins/utils'

export default {
  props: {
    view: {default: 'cardIcon'},
    category: {default: null},
    activities: {
      default: () => {
        return []
      }
    }
  },
  components: {},
  mounted() {
    this.$nextTick(function () {
    })
  },
  watch: {},
  data() {
    return {
      eventBus
    }
  },
  computed: {},
  methods: {}
}
</script>
<style lang="scss">
#gamificationActivityCardImage {
  .cardImageActivity {
    border-radius: 10px;
    height: 100%;

    .cardImage {
      height: 120px;
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>
