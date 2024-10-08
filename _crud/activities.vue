<template></template>
<script>
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
        extraFormFields: 'igamification.crud-fields.activities',
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
            {name: 'type', label: this.$tr('isite.cms.form.type'), field: 'typeName', align: 'left'},
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
            type: {
              value: null,
              type: 'treeSelect',
              props: {
                clearable: true,
                label: this.$tr('isite.cms.form.type')
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qgamification.types'
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
          type: {
            value: 1,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.type'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qgamification.types'
            }
          },
          url: {
            value: null,
            type: 'input',
            required: true,
            props: {
              label: 'URL *',
              vIf: ['1', '2'].includes(this.crudInfo.type)
            },
          },
          formId: {
            type: 'crud',
            required: true,
            props: {
              required: true,
              crudType: 'select',
              crudData: import('modules/qform/_crud/crudForms'),
              crudProps: {
                label: `${this.$tr('isite.cms.label.form')}*`,
                vIf: ['3'].includes(this.crudInfo.type)
              },
              config: {
                options: {
                  label: 'title', value: 'id'
                }
              },
            },
          },
          externalScript: {
            value: null,
            type: 'input',
            isFakeField: true,
            required: true,
            props: {
              label: 'Script *',
              type: 'textarea',
              rows: 2,
              vIf: ['4'].includes(this.crudInfo.type)
            }
          },
          iframe: {
            value: null,
            type: 'input',
            required: true,
            isFakeField: true,
            props: {
              label: 'Iframe *',
              vIf: ['5'].includes(this.crudInfo.type)
            },
          },
          tourElement: {
            value: null,
            type: 'input',
            required: true,
            isFakeField: true,
            props: {
              label: this.$tr('igamification.cms.label.tourElement'),
              vIf: ['6'].includes(this.crudInfo.type)
            },
          },
          tourElementPosition: {
            value: null,
            type: 'select',
            required: true,
            isFakeField: true,
            props: {
              label: this.$tr('igamification.cms.label.tourElementPosition'),
              vIf: ['6'].includes(this.crudInfo.type),
              options: [
                {label: this.$tr('isite.cms.label.top'), value: 'top'},
                {label: this.$tr('isite.cms.label.bottom'), value: 'bottom'},
                {label: this.$tr('isite.cms.label.left'), value: 'left'},
                {label: this.$tr('isite.cms.label.right'), value: 'right'}
              ]
            },
          },
          roles: {
            value: [],
            type: 'select',
            isFakeField: true,
            loadOptions: {
              apiRoute: 'apiRoutes.quser.roles',
              select: {label: 'name', id: 'id'},
            },
            props: {
              label: `${this.$trp('isite.cms.label.role')}*`,
              multiple: true,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          categoryId: {
            value: null,
            type: 'treeSelect',
            props: {
              label: this.$tr('isite.cms.form.category') + '*',
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
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
          icon: {
            value: 'fas fa-dice',
            type: 'selectIcon',
            isFakeField: true,
            required: true,
            props: {
              label: this.$tr('isite.cms.form.icon')
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
