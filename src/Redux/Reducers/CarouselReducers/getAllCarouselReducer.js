import { GET_ALL_CAROUSEL } from "../../types"


const initialValue = {
  allCarouselDataIsLoaded: false,
  allCarouselData: [],
}

const getAllCarouselReducer = (state = initialValue, action)=>{
  switch(action.type){
    case GET_ALL_CAROUSEL: return {
      allCarouselDataIsLoaded: true,
      allCarouselData: action.payload,
    }
    default: return state
  }
}

export default getAllCarouselReducer