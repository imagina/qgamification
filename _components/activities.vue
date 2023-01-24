<template>
  <div>
    <q-item v-if="mode === 'menu'">
      <div class="q-py-sm q-px-md">
        <div class="text-subtitle1 text-primary">{{ label }}</div>
        <!--Separator-->
        <q-separator class="q-my-sm"/>
        <!-- Description -->
        <div class="text-caption text-blue-grey">{{ activities.length ? description : $trp('isite.cms.label.noActivities') }}</div>
        <!--Actions-->
        <q-list v-if="activities.length" separator class="no-shadow" >
          <q-item v-for="(activity, keyActivity) in activities" :key="keyActivity" clickable v-ripple
                  v-close-popup @click.native="openActivity(activity)">
            <q-item-section class="text-blue-grey">
              <div>
                {{ activity.title }}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-item>
    <div v-else-if="mode === 'card' && activities.length" id="gamificationActivities" class="box relative-positions">
      <!-- Content -->
      <div id="content" class="q-py-sm q-px-lg">
        <!-- title -->
        <div class="box-title">{{ category.title }}</div>
        <q-separator class="q-mt-sm q-mb-md"/>
        <!-- Description -->
        <div class="text-grey-8 q-mb-xl text-body2" v-html="category.description"/>
        <!-- Activities -->
        <div class="row q-col-gutter-xl">
          <!-- Image -->
          <div class="col-12 col-md-6 text-center">
            <img style="max-width: 70%; border-radius: 5px;" :src="category.mediaFiles.mainimage.mediumThumb">
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
              <q-btn v-for="(activity, keyActivity) in activities" :key="keyActivity" color="blue-grey"
                    rounded outline :label="activity.title" class="full-width text-body2" no-caps
                    @click="openActivity(activity)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Form r-->
    <master-modal v-model="modal.form.show" :title="modal.form.title" :customPosition="true">
      <!--Content-->
      <dynamic-form :form-id="modal.form.formId" @sent="modal.form.sent = true" v-if="modal.form.formId" :description="modal.form.description"/>
    </master-modal>
    <master-modal v-model="modal.script.show" :title="modal.script.title" :customPosition="true">
      <div id="content-script-modal">
        <p v-html="modal.script.description" />
      </div>
    </master-modal>
    <inner-loading :visible="loading"/>
  </div>

</template>
<script>
export default {
  props: {
    systemName: {default: false},
    mode: {default: 'card'},
    label: {type: String, default: ''},
    description: {type: String, default: ''},
  },
  components: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
      console.log(this.formElementScript);
    })
  },
  watch: {
    'modal.script.show': (newValue) => {
      if (!newValue) {
        const firstElement = document.getElementsByClassName("b24-window-mounts")[0];
        const scripts = document.body.getElementsByTagName("script");
        const script = scripts[scripts.length - 1];
        firstElement?.remove();
        script?.remove();
      }
    }
  },
  data() {
    return {
      loading: false,
      category: null,
      activities: [],
      modal: {
        form: {
          show: false,
          loading: true,
          formId: undefined,
          sent: false,
          title: '',
          description: ''
        },
        script: {
          show: false,
          loading: true,
          title: '',
          description: ''
        },
      },
      formElementScript: null,
    }
  },
  computed: {},
  methods: {
    init() {
      this.getData(true)
    },
    //get attributes script
    getAttrsScript(script){
      const regexAttrs = /<[^/]+?(?:\".*?\"|'.*?'|.*?)*?>/;
      let attrs = script.match(regexAttrs)[0].split(" ");
      let lastAttr = attrs[attrs.length - 1];
      lastAttr = lastAttr.slice(0, lastAttr.length - 1);
      attrs[attrs.length - 1] = lastAttr;
      attrs.shift();
      return attrs;
    },
    //return script code
    getScriptCode(script){
      const indexCloseFirstTag = script.indexOf('>') + 1;
      const indexOpenLastTag = script.lastIndexOf('<');
      return script.slice(indexCloseFirstTag, indexOpenLastTag);
    },
    //get data
    async getData(refresh = false) {
      this.loading = true
      await this.getCategory(refresh)
      await this.getActivities(refresh)
      this.$emit('loaded')
      this.loading = false
    },
    //Get data
    getCategory(refresh = false) {
      return new Promise((resolve, reject) => {
        if (!this.systemName) return resolve(false)
        //Request params to category
        let requestParams = {
          refresh: refresh,
          params: {
            include: 'fields',
            filter: {field: 'system_name'}
          }
        }

        //Get category
        this.$crud.show('apiRoutes.qgamification.categories', this.systemName, requestParams).then(response => {
          this.category = response.data
          reoslve(response.data)
        }).catch(error => {
          resolve([])
        })
      })
    },
    //Get activities
    getActivities(refresh = false) {
      return new Promise(resolve => {
        if (!this.category) return resolve([])
        //Requets params
        let requestParams = {
          refresh: refresh,
          params: {
            include: 'users',
            filter: {categoryId: this.category.id, validateComplete: true}
          }
        }
        //Request
        this.$crud.index('apiRoutes.qgamification.activities', requestParams).then(response => {
          //Get userRoles
          let userRoles = this.$store.state.quserAuth.userData.roles.map(role => role.id)
          //Set only activities without complete
          this.activities = response.data.filter(item => {
            if (!item.userCompleted) {
              //Get role id from activity
              let activityRoles = (item.options?.roles || []).map(item => parseInt(item))
              //Check if current user has access to activity
              let hasAccess = false
              userRoles.forEach(userRole => {
                if (activityRoles.includes(userRole)) hasAccess = true
              })
              //Response
              if (hasAccess) return item
            }
          })
          resolve(response.data)
        }).catch(error => {
          resolve([])
        })
      })
    },
    //Open activity
    openActivity(activity) {
      let handlerActivity;
      const baseUrl = this.$store.state.qsiteApp.baseUrl;
      switch (activity.type) {
        case 1: {
          handlerActivity = () => {
            this.$router.push(activity.url);
          }
          break;
        }
        case 2: {
          handlerActivity = () => {
            this.$helper.openExternalURL(`${activity.url}`, true)
          }
          break;
        }
        case 3: {
          handlerActivity = () => {
            this.modal.form.formId = activity.formId;
            this.modal.form.show = true;
            this.modal.form.title = activity.title;
            this.modal.form.description = activity.description;
          }
          break;
        }
        case 4: {
          handlerActivity = () => {
            const script = activity.options.externlScript;
            const attrs = this.getAttrsScript(script);
            const scriptTag = document.createElement("script");
            attrs.forEach(string => {
              const attr = string.split("=");
              const key = attr[0].replace(/"/g, '').replace(/\\/g, '');
              const value = attr[1].replace(/"/g, '').replace(/\\/g, '');
              scriptTag.setAttribute(key, value);
            });
            const scriptCode = this.getScriptCode(script);
            scriptTag.appendChild(document.createTextNode(scriptCode));
            document.body.appendChild(scriptTag);
            setTimeout(() => {
              this.formElementScript = document.getElementsByClassName("b24-form")[0];      
              this.modal.script.show = true;
              this.modal.script.title = activity.title;
              this.modal.script.description = activity.description;
              setTimeout(() => {
                const contentModal = document.getElementById("content-script-modal");
                if (this.formElementScript) contentModal.appendChild(this.formElementScript);
                this.modal.script.loading = false;
              }, 1000);
            }, 1000);     
          }
          break;
        }
        default: {
          break;
        }
      }
      this.$alert.info({
        mode: 'modal',
        title: activity.title,
        message: activity.description,
        actions: [
          {
            label: this.$tr('isite.cms.label.close'),
            color: 'grey',
          },
          {
            label: this.$tr('isite.cms.label.show'),
            color: 'green',
            handler: handlerActivity
          }
        ]
      })
    }
  }
}
</script>
<style lang="stylus">
</style>
