<template>
  <div id="gamificationActivityListButton">
    <div class="row q-gutter-y-sm">
      <q-btn v-for="(activity, keyActivity) in activities" :key="keyActivity" color="blue-grey" rounded outline
             class="full-width text-body2" no-caps align="left"
             @click="eventBus.emit('open.gamification.activity', activity)">
        <q-icon :name="activity.icon" color="primary"/>
        <div class="text-blue-grey q-ml-md">{{ activity.title }}</div>
      </q-btn>
    </div>
  </div>
</template>
<script>
import eventBus from 'modules/qsite/_plugins/eventBus'

export default {
  props: {
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
</style>
