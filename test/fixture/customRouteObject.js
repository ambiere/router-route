export default {
  parents: [
    {
      element: '<h1>RootLayout </h1>',
      errorElement: '<h1>Error occured :/</h1>',
      childrenRef: '_rootChildRef'
    }
  ],

  childrens: {
    _rootChildRef: {
      parents: [
        {
          path: '/',
          element: '<h1>App </h1>'
        },
        {
          path: 'authors',
          element: '<h1>Authors </h1>',
          childrenRef: '_authorsChildRef'
        },
        {
          path: 'books',
          element: '<h1>Books </h1>',
          childrenRef: '_booksChildRef'
        }
      ],

      childrens: {
        _authorsChildRef: {
          parents: [
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
        _booksChildRef: {
          parents: [
            {
              path: 'add-book',
              element: '<h1>AddBook </h1>'
            }
          ]
        }
      }
    }
  }
}
