import axios from 'axios';

// INITIAL STATE
const initialState = {
  allBooks: [],
  popular: [],
  new: [],
  allLists: [],
  // booksInList: [],
  loading: true,
};

// ACTION TYPES
const GOT_ALL_BOOKS = 'GOT_ALL_BOOKS';
const GOT_ALL_LISTS = 'GOT_ALL_LISTS';
const GOT_POPULAR = 'GOT_POPULAR';
const GOT_NEW = 'GOT_NEW';

// ACTION CREATORS
const gotAllBooks = books => ({
  type: GOT_ALL_BOOKS,
  books,
});

const gotAllLists = allLists => ({
  type: GOT_ALL_LISTS,
  allLists,
});

const gotPopular = list => ({
  type: GOT_POPULAR,
  list,
});

const gotNew = list => ({
  type: GOT_NEW,
  list,
});

// THUNKS
export const fetchAllBooks = () => async dispatch => {
  try {
    const res = await axios.get('/api/books');
    dispatch(gotAllBooks(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllLists = () => async dispatch => {
  try {
    const res = await axios.get('/api/lists');
    dispatch(gotAllLists(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchPopular = () => async dispatch => {
  try {
    const res = await axios.get(`/api/books/popular`);
    dispatch(gotPopular(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchNew = () => async dispatch => {
  try {
    const res = await axios.get(`/api/books/new`);
    dispatch(gotNew(res.data));
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_BOOKS:
      return { ...state, allBooks: action.books, loading: false };
    case GOT_ALL_LISTS:
      return {
        ...state,
        allLists: action.allLists,
        // booksInList: action.list.books,
        loading: false,
      };
    case GOT_POPULAR:
      return {
        ...state,
        popular: action.list,
        loading: false,
      };
    case GOT_NEW:
      return {
        ...state,
        new: action.list,
        loading: false,
      };
    default:
      return state;
  }
}
