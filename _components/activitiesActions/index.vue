<template>
  <div id="actionsGamification">
    <!--Form-->
    <master-modal v-model="modal.form.show" :title="modal.form.title" :customPosition="true">
      <dynamic-form :loading="modal.form.loading" :blocks="modal.form.blocks"
                    @submit="formData => sendFormData(formData)" v-if="modal.form.blocks"
                    :description="modal.form.description"/>
    </master-modal>
    <master-modal v-model="modal.script.show" :title="modal.script.title" :customPosition="true">
      <div id="content-script-modal">
        <p v-html="modal.script.description"/>
      </div>
    </master-modal>
    <master-modal id="iframeModalActivity" v-model="modal.iframe.show" :title="category ? category.title : ''"
                  :customPosition="true">
      <div id="iframeActivity" v-html="modal.iframe.iframe"/>
    </master-modal>
  </div>
</template>
<script>
import { eventBus } from 'src/plugins/utils'
export default {
  beforeUnmount() {
    eventBus.off('open.gamification.activity')
  },
  props: {},
  components: {},
  watch: {
    'modal.script.show': (newValue) => {
      if (!newValue) {
        const firstElement = document.getElementsByClassName("b24-window-mounts")[0];
        const scripts = document.body.getElementsByTagName("script");
        const script = scripts[scripts.length - 1];
        firstElement?.remove();
        script?.remove();
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      eventBus.on('open.gamification.activity', this.openActivity)
    })
  },
  data() {
    return {
      category: null,
      modal: {
        form: {
          show: false,
          loading: false,
          formId: undefined,
          sent: false,
          title: '',
          description: '',
          blocks: []
        },
        script: {
          show: false,
          loading: true,
          title: '',
          description: ''
        },
        iframe: {
          show: false,
          iframe: null
        }
      },
    }
  },
  computed: {},
  methods: {
    //Open activity
    openActivity(activity) {
      switch (activity.type) {
        case 2:
          this.$helper.openExternalURL(`${activity.url}`, true)
          break;
        case 3:
          const fields = activity.form.fields;
          const dynamicFields = fields.map((field, fieldKey) => field.dynamicField);
          const blockForm = [{name: 'block1', fields: dynamicFields}];
          this.modal.form.show = true;
          this.modal.form.title = activity.title;
          this.modal.form.description = activity.description;
          this.modal.form.blocks = blockForm;
          this.modal.form.formId = activity.formId;
          break;
        case 4:
          const script = document.createRange().createContextualFragment(activity.options.externalScript);
          this.modal.script.show = true;
          this.modal.script.title = activity.title;
          this.modal.script.description = activity.description;
          this.modal.script.loading = true;
          setTimeout(() => {
            const contentModal = document.getElementById("content-script-modal");
            contentModal.appendChild(script);
            this.modal.script.loading = false;
          }, 1000);
          break;
        case 5:
          this.modal.iframe = {
            show: true,
            iframe: activity.options.iframe
          }
          break;
        default:
          let baseUrl = this.$store.state.qsiteApp.baseUrl
          this.$helper.openExternalURL(`${baseUrl}/${activity.url}`, false)
          break;
      }
    },
    //send form data
    sendFormData(formData) {
      const dataObject = {
        ...formData,
        form_id: this.modal.form.formId
      };
      this.modal.form.loading = true;
      this.$axios.post(`${this.baseUrl}${config('apiRoutes.qform.leads')}`, dataObject)
          .then(response => {
            if (response.status === 200) {
              this.modal.form.loading = false;
              this.modal.form.show = false;
              this.$alert.info({message: `${this.$tr('isite.cms.message.recordCreated')}`})
            }
          })
          .catch(error => {
            this.modal.form.loading = false;
            this.modal.form.show = false;
            this.$alert.error({message: `${this.$tr('isite.cms.message.recordNoCreated')}`})
            console.error(error);
          });
    }
  }
}
</script>
<style lang="scss">
</style>
