<template>
  <div id="activitiesListViewComponent" class="relative-position">
    <!-- Card Mode-->
    <div class="box relative-positions">
      <!-- Content -->
      <div id="content">
        <!-- title -->
        <div class="box-title">
          <q-icon :name="category.icon"/>
          {{ category.title }}
        </div>
        <q-separator class="q-mt-sm q-mb-md"/>
        <!-- Description -->
        <div class="text-grey-8 q-mb-md text-body2" v-html="category.description"/>
        <!-- Activities -->
        <div class="row q-col-gutter-xl">
          <!-- Image -->
          <div class="col-12 col-md-6 text-center">
            <div class="row items-center justify-center full-height full-width">
              <img style="max-width: 70%; border-radius: 5px;" :src="category.mediaFiles.mainimage.mediumThumb">
            </div>
          </div>
          <!-- Activities -->
          <div class="col-12 col-md-6">
            <!-- Category Subtitle -->
            <div v-if="category.subtitle">
              <div class="text-center box-title">
                <b>{{ category.subtitle }}</b>
              </div>
              <q-separator class="q-mt-sm q-mb-md"/>
            </div>
            <!-- Activities -->
            <div class="row q-gutter-y-sm">
              <q-btn v-for="(activity, keyActivity) in activities" :key="keyActivity" color="blue-grey" rounded outline
                     :label="activity.title" class="full-width text-body2" no-caps
                     @click="$eventBus.$emit('open.gamification.activity', activity)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
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
