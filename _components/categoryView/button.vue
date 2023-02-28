<template>
  <div id="activitiesButtonViewComponent" class="relative-position">
    <q-btn :icon="category.icon" rounded :label="category.title" v-bind="btnProps">
      <q-menu>
        <div class="q-py-sm q-px-md">
          <div class="text-subtitle1 text-primary">{{ category.title }}</div>
          <!--Separator-->
          <q-separator class="q-my-sm"/>
          <!-- Description -->
          <div class="text-caption text-blue-grey q-mb-md" v-html="category.description"/>
          <!--Actions-->
          <component :is="activityViewComponent" :activities="activities"/>
        </div>
      </q-menu>
    </q-btn>
  </div>
</template>
<script>
export default {
  props: {
    category: {default: null},
    activityViewComponent: {default: null},
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
