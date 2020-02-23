import { postActionTypes } from '../action-types/index';

const initialState = {
  currentPosts: [],
  post: {},
};

export function postState(state = initialState, action) {
  switch(action.type){
    case postActionTypes.GETALL_SUCCESS:
      
      if (!action.posts && action.page !== 0) {
        return {
          ...state,
          reachedEnd: true
        }
      }
      if (action.page === 0) {
        return {
          ...state,
          reachedEnd: false,
          currentPosts: action.posts
        };
      }
      return {
        ...state,
        currentPosts: state.currentPosts.concat(action.posts)
      };
    case postActionTypes.GETALL_FAILURE:
      return {
        error: action.error
      };
    case postActionTypes.GETBYUSER_SUCCESS:
      return {
        ...state,
        currentPosts: action.userPosts
      };
    case postActionTypes.GETBYUSER_FAILURE:
      return {
        error: action.error
      };
    case postActionTypes.GETUSERFAVORITES_SUCCESS:
      return {
        ...state,
        currentPosts: action.favoritePosts
      };
    case postActionTypes.GETUSERFAVORITES_FAILURE:
      return {
        error: action.error
      };
    case postActionTypes.ADD_SUCCESS:
      return {
        ...state,
        post: action.post
      };
    case postActionTypes.ADD_FAILURE:
      return {
        error: action.error
      };
    case postActionTypes.UPDATE_SUCCESS:
      return {
        ...state
      };
    case postActionTypes.UPDATE_FAILURE:
      return {
        error: action.error
      };
    case postActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        currentPosts: state.currentPosts.filter(item => item._id !== action.post._id)
      }
    case postActionTypes.DELETE_FAILURE:
      return {
        error: action.error
      };
    case postActionTypes.DELETE_ALL_BY_USER:
      return {
        ...state,
        removalDone: action.success
      };
    case postActionTypes.CLEAR_POST:
      return {
        ...state,
        post: null,
        currentPosts: null
      };
    case postActionTypes.UPDATE_EDITOR_STATE:
      return {
        ...state,
        postHtml: action.content
      }
    default:
      return state;
  }
}