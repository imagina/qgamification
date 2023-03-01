<template>
  <div id="gamificationCategoryPopupView">
    <master-modal id="gamificationCategoryPopup" v-model="showModal" :title="category.title" persistent
                  :icon="category.icon">
      <!-- Image -->
      <div class="row items-center justify-center full-width q-mb-md">
        <div :style="`background-image: url('${category.mediaFiles.mainimage.mediumThumb}'); min-height: 150px`"
             class="img-as-bg round full-width full-height"/>
      </div>
      <!--Subtitle-->
      <div class="box-title text-center q-mb-sm" v-if="category.subtitle">{{ category.subtitle }}</div>
      <!-- Description -->
      <div v-if="category.description" class="text-grey-8 q-mb-md text-body2" v-html="activity.description"/>
      <!-- Activities -->
      <component :is="activityViewComponent" :activities="activities"/>
    </master-modal>
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
    }
  },
  components: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  watch: {},
  data() {
    return {
      showModal: false,
      showActivityIndex: 0
    }
  },
  computed: {
    activity() {
      return this.activities[this.showActivityIndex]
    }
  },
  methods: {
    init() {
      setTimeout(() => {
        this.showModal = true
      }, 1000)
    }
  }
}
</script>
<style lang="stylus">
#activitiesCardViewComponent
  .cardActivity
    //border 1px solid $grey-4
    //border-radius 10px
    padding 10px
    height 100%

    .cardImage
      height 120px
      width 100%
      border-radius 10px
</style>
