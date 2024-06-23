export default [
  {
    element: '<h1>RootLayout </h1>',
    errorElement: '<h1>Error occured :/</h1>',
    children: [
      {
        path: '/',
        element: '<h1>App </h1>'
      },
      {
        path: 'authors',
        element: '<h1>Authors </h1>',
        children: [
          {
            path: 'add-author',
            element: '<h1>AddAuthor </h1>'
          },
          {
            path: ':name/settings',
            element: '<h1>EditAuthor </h1>'
          }
        ]
      },
      {
        path: 'books',
        element: '<h1>Books </h1>',
        children: [
          {
            path: 'add-book',
            element: '<h1>AddBook </h1>'
          }
        ]
      }
    ]
  }
]
