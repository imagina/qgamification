<template>
  <div id="gamificationCategoryPopupView">
    <master-modal id="gamificationCategoryPopup" v-model="showModal" :title="category.title" persistent
                  :icon="category.icon">
      <!-- Image -->
      <div class="row items-center justify-center full-width q-mb-md">
        <img style="max-width: 70%; border-radius: 5px;" :src="category.mediaFiles.mainimage.mediumThumb">
      </div>
      <!--Subtitle-->
      <div class="box-title text-center q-mb-sm" v-if="category.summary">{{ category.summary }}</div>
      <!-- Description -->
      <div v-if="category.description" class="text-grey-8 q-mb-md text-body2" v-html="category.description"/>
      <!-- Activities -->
      <component :is="activityDynamicComponent" :activities="activities"/>
    </master-modal>
  </div>
</template>
<script>
import { markRaw } from 'vue';

export default {
  props: {
    category: { default: null },
    activityViewComponent: { default: null },
    activities: {
      default: () => {
        return [];
      }
    }
  },
  components: {},
  mounted() {
    this.$nextTick(function() {
      this.setActivityDynamicComponent();
    });
  },
  watch: {},
  data() {
    return {
      activityDynamicComponent: null
    };
  },
  computed: {},
  methods: {
    async setActivityDynamicComponent() {
      const component = await this.activityViewComponent();
      this.activityDynamicComponent = markRaw(component.default);
    }
  }
};
</script>
<style lang="scss">
#activitiesCardViewComponent {
  .cardActivity {
    //border: 1px solid $grey-4;
    //border-radius: 10px;
    padding: 10px;
    height: 100%;

    .cardImage {
      height: 120px;
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>
