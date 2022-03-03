const pages = config('pages') // Get Pages from config

//Blog
export default [
  {
    title: 'igamification.cms.sidebar.adminGroup',
    icon: 'fas fa-gamepad',
    children: [
      pages.qgamification.activities, // activities setup
      pages.qgamification.categories, // categories setup
    ]
  },
]
