<template>
  <div id="activitiesButtonViewComponent" class="relative-position">
    <q-btn :icon="category.icon" rounded :label="category.title" v-bind="btnProps">
      <q-menu transition-show="jump-down" transition-hide="jump-up"
              content-style="border: 3px solid darkcyan; border-radius: 10px">
        <div class="q-pt-sm q-pb-md q-px-md">
          <div class="text-subtitle1 text-primary row justify-between items-center">
            <!-- Title -->
            {{ category.title }}
            <!--Close Button-->
            <q-btn v-close-popup icon="fas fa-times" round color="blue-grey" unelevated class="btn-small" outline/>
          </div>
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
