<template>
  <div id="gamificationActivityCardIcon">
    <div class="row q-col-gutter-sm">
      <div v-for="(activity, keyActivity) in activities" :key="keyActivity" class="col-6 col-lg-4 col-xl-3">
        <div class="cardIconActivity cursor-pointer over-effect"
             @click="eventBus.emit('open.gamification.activity', activity)">
          <!-- Icon -->
          <div class="text-center q-mb-md">
            <q-icon :name="activity.icon" color="primary" size="38px"/>
          </div>
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
#gamificationActivityCardIcon {
  .cardIconActivity {
    border: 1px solid $grey-4;
    border-radius: 10px;
    padding: 10px;
    height: 100%;
  }
}
</style>
