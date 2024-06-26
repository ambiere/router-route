export default [
  {
    element: '<h1>RootLayout </h1>',
    errorElement: '<h1>Error occured :/</h1>',
    children: [
      {
        path: 'authors',
        element: '<Authors />',
        loader: 'authorsDataLoader',
        children: [
          {
            path: 'add-author',
            element: '<AddAuthor />',
            action: 'addAuthorAction'
          }
        ]
      },
      {
        path: 'account',
        element: '<Account />',
        loader: 'accountDataLoader',
        children: [
          {
            path: 'user/:userId',
            element: '<User />',
            loader: 'userDataLoader',
            children: [
              {
                path: 'profile',
                element: '<Profile />'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'books',
    element: '<Books />',
    loader: 'booksDataLoader',
    children: [
      {
        path: 'add-book',
        element: '<AddBook />',
        action: 'addBookAction'
      }
    ]
  }
]
