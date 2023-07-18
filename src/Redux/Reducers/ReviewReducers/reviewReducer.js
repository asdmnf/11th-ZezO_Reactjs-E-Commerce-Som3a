import { ADD_REVIEW, ALL_REVIEWS, EDIT_REVIEW, GET_SPECIFIC_REVIEW, REMOVE_REVIEW } from "../../types"


const initialValue = {
  addReviewResponseIsLoaded: false,
  allReviewsDataIsLoaded: false,
  removeReviewResponseIsLoaded: false,
  editReviewResponseIsLoaded: false,
  specificReviewDataIsLoaded: false,
  addReviewResponse: [],
  allReviewsData: [],
  removeReviewResponse: [],
  editReviewResponse: [],
  specificReviewData: [],
}

const reviewReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case ADD_REVIEW: return {
      addReviewResponseIsLoaded: true,
      addReviewResponse: action.payload,
    }
    case ALL_REVIEWS: return {
      allReviewsDataIsLoaded: true,
      allReviewsData: action.payload,
    }
    case REMOVE_REVIEW: return {
      removeReviewResponseIsLoaded: true,
      removeReviewResponse: action.payload,
    }
    case EDIT_REVIEW: return {
      editReviewResponseIsLoaded: true,
      editReviewResponse: action.payload,
    }
    case GET_SPECIFIC_REVIEW: return {
      specificReviewDataIsLoaded: true,
      specificReviewData: action.payload,
    }
    default: return state
  }
}

export default reviewReducer