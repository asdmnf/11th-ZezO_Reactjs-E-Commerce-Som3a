import { ALL_REVIEW_2 } from "../types"


const initialValue = {
  allReviewsDataIsLoaded: false,
  allReviewsData: [],
}

const review2Reducer = (state = initialValue, action)=>{
  switch(action.type){
    case ALL_REVIEW_2: return {
      allReviewsDataIsLoaded: true,
      allReviewsData: action.payload,
    }
    default: return state
  }
}

export default review2Reducer