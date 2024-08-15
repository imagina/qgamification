<template>
  <div id="activitiesButtonViewComponent" class="relative-position">
    <q-btn 
      :icon="category.icon" 
      rounded
      outline
      :label="category.title" 
      v-bind="btnProps"
    >
      <q-menu 
        transition-show="jump-down" 
        transition-hide="jump-up"
        class="tw-border-2 tw-border-gray-100 tw-shadow-none"
        style="border-radius: 15px;"
      >
        <div>
          <section class="row justify-between items-center tw-p-5">
            <!-- Title -->
            <span class="tw-text-xl tw-leading-5 tw-font-bold">{{ category.title }}</span>
            <!--Close Button-->
            <q-btn unelevated rounded dense padding="none" size="xs" v-close-popup>
              <q-icon name="fa-regular fa-times" color="grey-7" size="22px" class="cursor-pointer" />
            </q-btn>
          </section>
          <!--Separator-->
          <q-separator class="tw-bg-gray-200" />
          <section class="tw-p-5">
             <!-- Description -->
             <div class="tw-text-sm tw-mb-5" v-html="category.description"/>
             
             <!--Actions-->
             <component :is="activityDynamicComponent" :activities="activities"/>
          </section>
        </div>
      </q-menu>
    </q-btn>
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
</style>
