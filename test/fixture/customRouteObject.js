const booksRouteModule = {
  parents: [
    {
      path: 'books',
      element: '<Books />',
      loader: 'booksDataLoader',
      childrenRef: '_booksChildRef'
    }
  ],
  childrens: {
    _booksChildRef: {
      parents: [
        {
          path: 'add-book',
          element: '<AddBook />',
          action: 'addBookAction'
        }
      ]
    }
  }
}

const usersRouteModule = {
  parents: [
    {
      path: 'user/:userId',
      element: '<User />',
      loader: 'userDataLoader',
      childrenRef: '_userChildRef'
    }
  ],
  childrens: {
    _userChildRef: {
      parents: [
        {
          path: 'profile',
          element: '<Profile />'
        }
      ]
    }
  }
}

export default {
  parents: [
    {
      element: '<h1>RootLayout </h1>',
      errorElement: '<h1>Error occured :/</h1>',
      childrenRef: '_rootChildRef'
    },
    /** Support modularization for parents */
    booksRouteModule
  ],
  childrens: {
    _rootChildRef: {
      parents: [
        {
          path: 'authors',
          element: '<Authors />',
          loader: 'authorsDataLoader',
          childrenRef: '_authorsChildRef'
        },
        {
          path: 'account',
          element: '<Account />',
          loader: 'accountDataLoader',
          childrenRef: '_accountChildRef'
        }
      ],
      childrens: {
        _authorsChildRef: {
          parents: [
            {
              path: 'add-author',
              element: '<AddAuthor />',
              action: 'addAuthorAction'
            }
          ]
        },
        /** Support modularization for childrens */
        _accountChildRef: usersRouteModule
      }
    }
  }
}
