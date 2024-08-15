<template>
  <div id="gamificationActivityListButton">
    <div class="tw-flex tw-gap-2.5 tw-flex-col">
      <q-btn 
        v-for="(activity, keyActivity) in activities" 
        :key="keyActivity" 
        rounded
        flat
        class="full-width tw-bg-gray-100 tw-px-5 tw-py-3" 
        no-caps align="left"
        @click="eventBus.emit('open.gamification.activity', activity)"
      >
        <q-icon :name="activity.icon" color="primary"/>
        <span class="tw-text-base tw-text-gray-600 tw-ml-2.5">
          {{ activity.title }}
        </span>
      </q-btn>
    </div>
  </div>
</template>
<script>
import { eventBus } from 'src/plugins/utils'

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
