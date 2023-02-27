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
        <!--Subtitle-->
        <div class="box-title" v-if="category.subtitle">
          <b>{{ category.subtitle }}</b>
        </div>
        <!-- Description -->
        <div v-if="category.description" class="text-grey-8 q-mb-md text-body2" v-html="category.description"/>
        <!-- Activities -->
        <div class="row q-col-gutter-md">
          <!-- Image -->
          <div class="col-12 col-md-6 text-center">
            <div class="row items-center justify-center full-height full-width">
              <div :style="`background-image: url('${category.mediaFiles.mainimage.mediumThumb}')`"
                   class="img-as-bg round full-width full-height"/>
            </div>
          </div>
          <!-- Activities -->
          <div class="col-12 col-md-6">
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
