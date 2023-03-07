export default {
  activities: {
    permission: 'igamification.activities.manage',
    activated: true,
    authenticated: true,
    path: '/gamification/activities/index',
    name: 'qgamification.admin.activities',
    crud: import('@imagina/qgamification/_crud/activities'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'igamification.cms.sidebar.adminActivities',
    icon: 'fal fa-dice',
    subHeader: {
      refresh: true,
    }
  },
  categories: {
    permission: 'igamification.categories.manage',
    activated: true,
    authenticated: true,
    path: '/gamification/categories/index',
    name: 'gamification.admin.categories',
    crud: import('@imagina/qgamification/_crud/categories'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'igamification.cms.sidebar.adminCategories',
    icon: 'fal fa-layer-group',
    subHeader: {
      refresh: true,
    }
  }
}
