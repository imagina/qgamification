export default {
  categories: {
    permission: 'igamification.categories.manage',
    activated: true,
    authenticated: true,
    path: '/gamification/categories/index',
    name: 'gamification.admin.categories',
    crud: import('modules/qgamification/_crud/categories'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'igamification.cms.sidebar.adminGroup',
    icon: 'fa-light fa-gamepad-modern',
    subHeader: {
      refresh: true,
    }
  }
}
