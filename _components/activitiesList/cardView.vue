<template>
  <div id="activitiesCardViewComponent">
    <!-- Card Mode-->
    <div class="box relative-positions">
      <!-- title -->
      <div class="box-title text-center">
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
      <div class="row q-col-gutter-sm">
        <div v-for="(activity, keyActivity) in activities" :key="keyActivity" class="col-6 col-lg-3 col-xl-2">
          <div class="cardActivity cursor-pointer" @click="$eventBus.$emit('open.gamification.activity', activity)">
            <!-- Image -->
            <div v-if="view == 'cardImage'"
                 :style="`background-image: url('${activity.mediaFiles.mainimage.mediumThumb}')`"
                 class="img-as-bg cardImage q-mb-md"/>
            <!-- Icon -->
            <div v-else class="text-center q-mb-md">
              <q-icon :name="activity.icon" color="primary" size="38px"/>
            </div>
            <!-- Text -->
            <div class="text-blue-grey text-body2 text-bold text-center"> {{ activity.title }}</div>
            <div class="text-caption text-blue-grey" v-html="activity.description"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
    return {}
  },
  computed: {},
  methods: {}
}
</script>
<style lang="stylus">
#activitiesCardViewComponent
  .cardActivity
    border 1px solid $blue-grey
    border-radius 10px
    padding 10px
    height 100%

    .cardImage
      height 90px
      width 100%
      border-radius 10px
</style>
