<template>
  <div id="gamificationCategoryCardView">
    <div class="box relative-positions">
      <!-- title -->
      <div class="box-title text-center">
        <q-icon :name="category.icon" />
        {{ category.title }}
      </div>
      <q-separator class="q-mt-sm q-mb-md" />
      <!-- Activities -->
      <div class="row q-col-gutter-md">
        <!-- Image -->
        <div class="col-12 col-md-6 text-center">
          <div class="row items-center justify-center full-height full-width">
            <img style="max-width: 70%; border-radius: 5px;" :src="category?.mediaFiles?.mainimage.mediumThumb">
          </div>
        </div>
        <!-- Activities -->
        <div class="col-12 col-md-6">
          <!--Subtitle-->
          <div class="box-title text-center q-mb-md" v-if="category.summary">{{ category.summary }}</div>
          <!-- Description -->
          <div v-if="category.description" class="text-grey-8 q-mb-md text-body2" v-html="category.description" />
          <!-- Activities -->
          <component :is="activityDynamicComponent" :activities="activities" />
        </div>
      </div>
    </div>
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
