<template></template>
<script>
//Component
import crud from '@imagina/qcrud/_components/crud'

export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qgamification.entityNames.activity"),
        apiRoute: 'apiRoutes.qgamification.activities',
        permission: 'igamification.categories',
        extraFormFields: 'igamification.crud-fields.categories',
        create: {
          title: this.$tr('igamification.cms.newActivity'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'name', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth'},
            {name: 'systemName', label: this.$tr('isite.cms.form.systemName'), field: 'systemName', align: 'left'},
            {name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'left'},
            {
              name: 'category', label: this.$trp('isite.cms.label.category'), field: 'categories',
              align: 'left', classes: 'ellipsis', style: 'max-width : 250px',
              format: val => val ? val.map(item => item.title).join(', ') : '-'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'category,categories'},
          filters: {
            categoryId: {
              value: null,
              type: 'treeSelect',
              props: {
                clearable: true,
                label: this.$tr('isite.cms.form.category')
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qgamification.categories'
              }
            },
          }
        },
        update: {
          title: this.$tr('igamification.cms.updateActivity'),
          requestParams: {include: 'category,categories'}
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
          url: {
            value: null,
            type: 'input',
            props: {
              label: 'URL',
            },
          },
          status: {
            value: '1',
            type: 'select',
            props: {
              label: `${this.$tr('isite.cms.form.status')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qgamification.statuses'
            }
          },
          categoryId: {
            value: null,
            type: 'treeSelect',
            props: {
              label: this.$tr('isite.cms.form.category')
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qgamification.categories',
              requestParams: {include: 'parent'}
            }
          },
          categories: {
            value: null,
            type: 'treeSelect',
            props: {
              label: this.$trp('isite.cms.form.category'),
              multiple: true
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qgamification.categories',
              requestParams: {include: 'parent'}
            }
          },
          mediasSingle: {
            name: 'mediasSingle',
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.firstImage'),
              zone: 'mainimage',
              entity: "Modules\\igamification\\Entities\\Activity",
              entityId: null
            }
          }
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>
