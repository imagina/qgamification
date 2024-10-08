<template>
  <div>
    <master-modal v-model="modalActivities.show" :title="actsCrud.title" custom-position
                  @hide="modalActivities.category  = null">
      <crud v-if="modalActivities.category"
            :crud-data="import('modules/qgamification/_crud/activities.vue')"
            :custom-data="actsCrud.customData"/>
    </master-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid(),
      modalActivities: {
        show: false,
        category: null
      }
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qgamification.entityNames.category"),
        apiRoute: 'apiRoutes.qgamification.categories',
        permission: 'igamification.categories',
        extraFormFields: 'igamification.crud-fields.categories',
        create: {
          title: this.$tr('igamification.cms.newCategory'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'name', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth'},
            {name: 'systemName', label: this.$tr('isite.cms.form.systemName'), field: 'systemName', align: 'left'},
            {name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'left'},
            {
              name: 'activities',
              label: this.$trp('isite.cms.label.activity'),
              field: 'activities',
              align: 'left',
              format: val => `${this.$trp('isite.cms.label.activity')}(${val ? val.length : 0})`,
              action: this.manageCategoryActivities
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'activities'},
          filters: {
            parentId: {
              value: null,
              type: 'treeSelect',
              props: {
                clearable: true,
                label: this.$tr('isite.cms.form.parent')
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qgamification.categories',
                requestParams: {filter: {status: 1}}
              }
            },
          },
          actions: [
            {
              icon: 'fal fa-dice',
              tooltip: this.$trp('isite.cms.label.activity'),
              action: this.manageCategoryActivities
            }
          ]
        },
        update: {
          title: this.$tr('igamification.cms.updateCategory'),
          requestParams: {include: 'parent,fields'}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          systemName: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.systemName')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          summary: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.label.summary'),
            },
          },
          description: {
            value: '',
            type: 'html',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          }
        },
        formRight: {
          status: {
            value: '1',
            type: 'select',
            props: {
              label: `${this.$tr('isite.cms.form.status')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              options: [
                { label: this.$tr('isite.cms.label.enabled'), value: 1 },
                { label: this.$tr('isite.cms.label.disabled'), value: 0 },
              ],
            },
          },
          parentId: {
            value: 0,
            type: 'treeSelect',
            props: {
              label: this.$tr('isite.cms.form.parent'),
              options: [
                {label: this.$tr('isite.cms.label.disabled'), id: 0},
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qgamification.categories',
              select: {label: 'title', id: 'id'},
              requestParams: {include: 'parent', filter: {status: 1}}
            }
          },
          icon: {
            value: 'fas fa-gamepad',
            type: 'selectIcon',
            isFakeField: true,
            props: {
              label: this.$tr('isite.cms.form.icon')
            }
          },
          categoryView: {
            value: 'card',
            type: 'select',
            isFakeField: true,
            props: {
              label: `${this.$tr('igamification.cms.label.categoryView')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              options: [
                { label: 'Card', value: 'card', },
                { label: 'Button', value: 'button', },
                { label: 'Popup', value: 'popup', },
              ],
            },
          },
          slug: {
            value: '',
            type: 'input',
            props: {
              label: `slug*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          mediasSingle: {
            name: 'mediasSingle',
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.firstImage'),
              zone: 'mainimage',
              entity: "Modules\\Igamification\\Entities\\Category",
              entityId: null
            }
          }
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    },
    //Return configuration for activities CRUD
    actsCrud() {
      //Instance the categoryId
      const categoryId = this.modalActivities.category?.id || null
      //Instance the response
      const response = {
        title: this.modalActivities.category?.title || '',
        customData: {
          read: {
            showAs: 'drag',
            drag: {
              title: {field: 'title'},
              subTitle: {field: 'typeName'},
            },
            noFilter: true,
            requestParams: {
              include: "",
              filter: {categoryId, order: {field: 'position', way: 'asc'}}
            }
          },
          formRight: {
            categoryId: {
              value: categoryId,
              type: 'select',
              props: {
                label: this.$tr('isite.cms.form.category') + '*',
                readonly: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qgamification.categories',
                requestParams: {include: 'parent'}
              }
            },
            categories: {
              value: [categoryId],
              type: 'select',
              props: {
                label: this.$trp('isite.cms.form.category'),
                multiple: true,
                readonly: true,
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qgamification.categories',
                requestParams: {include: 'parent'}
              }
            },
          }
        }
      }
      return response
    }
  },
  methods: {
    manageCategoryActivities(category) {
      this.modalActivities = {show: true, category}
    }
  }
}
</script>
