<template>
  <div id="activitiesButtonViewComponent" class="relative-position">
    <!--Actions-->
    <q-list v-if="activities.length" separator class="no-shadow">
      <q-item v-for="(activity, keyActivity) in activities" :key="keyActivity" clickable v-ripple v-close-popup
              @click.native="eventBus.emit('open.gamification.activity', activity)">
        <q-item-section class="text-blue-grey">
          <div>
            <q-icon :name="activity.icon" class="q-mr-sm" color="primary" size="xs"/>
            {{ activity.title }}
          </div>
        </q-item-section>
        <q-item-section side>
          <q-icon name="fa-light fa-chevron-right" size="12px"/>
        </q-item-section>
      </q-item>
    </q-list>
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
