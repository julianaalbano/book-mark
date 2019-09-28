import axios from 'axios';

// INITIAL STATE
const initialState = {
  allBooks: [],
  singleBook: {},
  list: {},
  booksInList: [],
  loading: true,
  popular: [],
  new: [],
};

// ACTION TYPES
const GOT_ALL_BOOKS = 'GOT_ALL_BOOKS';
const GOT_SINGLE_BOOK = 'GOT_SINGLE_BOOK';
const GOT_LIST = 'GOT_LIST';
const GOT_POPULAR = 'GOT_POPULAR';
const GOT_NEW = 'GOT_NEW'L

// ACTION CREATORS
const gotAllBooks = books => ({
  type: GOT_ALL_BOOKS,
  books,
});

const gotSingleBook = book => ({
  type: GOT_SINGLE_BOOK,
  book,
});

const gotList = list => ({
  type: GOT_LIST,
  list,
});

const gotPopular = list => ({
  type: GOT_POPULAR,
  list,
});

const gotNew = list => ({
  type: GOT_NEW,
  list,
})

// THUNKS
export const fetchAllBooks = () => async dispatch => {
  try {
    const res = await axios.get('/api/books');
    dispatch(gotAllBooks(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchSingleBook = id => async dispatch => {
  try {
    const res = await axios.get(`/api/books/${id}`);
    dispatch(gotSingleBook(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchList = name => async dispatch => {
  try {
    const res = await axios.get(`/api/lists/${name}`);
    dispatch(gotList(res.data));
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
    case GOT_SINGLE_BOOK:
      return { ...state, singleBook: action.book };
    case GOT_LIST:
      return {
        ...state,
        list: action.list,
        booksInList: action.list.books,
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
