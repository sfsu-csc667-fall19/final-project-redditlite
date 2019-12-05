const DEFAULT_STATE = {
  // notes: [], // default
  notes: [
    {
      title: 'first one',
      description: 'like father like son',
      timestamp: '15 mins',
      author: {
        username: 'monbo'
      },
      comments: '60k'
    },
    {
      title: 'second one',
      description: 'sword is mighter than a knife?',
      timestamp: '10 mins',
      author: {
        username: 'jumbo'
      },
      comments: '10k'
    },
    {
      title: 'third one',
      description: 'something something dark side',
      timestamp: '5 mins',
      author: {
        username: 'trash'
      },
      comments: '30k'
    },
  ], // default
  newNote: '',
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
