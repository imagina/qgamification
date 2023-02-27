<template>
  <div id="activitiesButtonViewComponent" class="relative-position">
    <q-btn v-bind="btnProps" :icon="category.icon">
      <q-menu>
        <div class="q-py-sm q-px-md">
          <div class="text-subtitle1 text-primary">{{ category.title }}</div>
          <!--Separator-->
          <q-separator class="q-my-sm"/>
          <!-- Description -->
          <div class="text-caption text-blue-grey" v-html="category.description"/>
          <!--Actions-->
          <q-list v-if="activities.length" separator class="no-shadow">
            <q-item v-for="(activity, keyActivity) in activities" :key="keyActivity" clickable v-ripple v-close-popup
                    @click.native="$eventBus.$emit('open.gamification.activity', activity)">
              <q-item-section class="text-blue-grey">
                <div>
                  <q-icon v-if="activity.options.icon" :name="activity.options.icon" class="q-mr-sm" color="primary"
                          size="xs"/>
                  {{ activity.title }}
                </div>
              </q-item-section>
              <q-item-section side>
                <q-icon name="fa-light fa-chevron-right" size="12px"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-menu>
      <!-- Tooltip -->
      <q-tooltip>{{ category.title }}</q-tooltip>
    </q-btn>
  </div>
</template>
<script>
export default {
  props: {
    category: {default: null},
    activities: {
      default: () => {
        return []
      }
    },
    btnProps: {
      type: Object, default: () => {
        return {}
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
    return {}
  },
  computed: {},
  methods: {}
}
</script>
<style lang="stylus">
</style>
