const DEFAULT_STATE = {
  // notes: [], // default
  notes: [
    {
      title: 'first one',
      text: 'like father like son',
      author: 'monbo',
      num_comments: '60k',
      _createdAt: 'Date.now()'
    },
    {
      title: 'second one',
      text: 'sword is mighter than a knife?',
      author: 'jumbo',
      num_comments: '10k',
      _createdAt: 'Date.now()',
    },
    {
      title: 'third one',
      text: 'something something dark side',
      author: 'trash',
      num_comments: '30k',
      _createdAt: 'Date.now()'
    },
    {
      title: 'fourth one',
      text: 'good from far but far from good',
      author: 'robo',
      num_comments: '69k',
      _createdAt: 'Date.now()'
    },
    {
      title: 'fifth one',
      text: 'heroes are born not made',
      author: 'cliche',
      num_comments: '1337k',
      _createdAt: 'Date.now()'
    }
  ], // default
  newNote: '',
  post: {
    // you will inject the data of the one u clicked on here
    comments: [
      {
        text: 'lick me good',
        author: 'troll',
        parent: null,
        comments: [],
        _createdAt: "Date.now()"
      },
      {
        text: 'gloria',
        author: 'llort',
        parent: null,
        comments: [
          {
            text: 'sub com 0',
            author: 'com0',
            parent: 'some_uuid_which_does_not_concern_us',
            comments: [], // will always be empty
            _createdAt: "Date.now()"
          }
        ],
        _createdAt: "Date.now()"
      },
      {
        text: 'airolg',
        author: 'roll',
        parent: null,
        comments: [],
        _createdAt: "Date.now()"
      },
      {
        text: 'doog em kcil',
        author: 'llor',
        parent: null,
        comments: [
          {
            text: 'sub com 0',
            author: 'com0',
            parent: 'some_uuid_which_does_not_concern_us',
            comments: [], // will always be empty
            _createdAt: "Date.now()"
          },
          {
            text: 'sub com 1',
            author: 'com1',
            parent: 'some_uuid_which_does_not_concern_us',
            comments: [], // will always be empty
            _createdAt: "Date.now()"
          }
        ],
        _createdAt: "Date.now()"
      }
    ]
  }
};

const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'NOTES_SET_NEW_NOTE':
      return {
        ...state,
        newNote: action.newNote
      }
    case 'NOTES_SET_NOTES':
      return {
        ...state,
        notes: action.notes
      }
    default:
      return state;
  }
};

export default notesReducer;
