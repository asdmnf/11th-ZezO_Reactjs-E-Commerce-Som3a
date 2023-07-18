import { CREATE_CAROUSEL, DELETE_CAROUSEL, GET_SPECIFIC_CAROUSEL, UPDATE_CAROUSEL } from "../../types"


const initialValue = {
  createCarouselResponseIsLoaded: false,
  specificCarouselDataIsLoaded: false,
  updateCarouselResponseIsLoaded: false,
  ddeleteCarouselResponseIsLoaded: false,
  createCarouselResponse: [],
  specificCarouselData: [],
  updateCarouselResponse: [],
  ddeleteCarouselResponse: [],
}

const carouselOperationsReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case CREATE_CAROUSEL: return {
      createCarouselResponseIsLoaded: true,
      createCarouselResponse: action.payload,
    }
    case GET_SPECIFIC_CAROUSEL: return {
      specificCarouselDataIsLoaded: true,
      specificCarouselData: action.payload,
    }
    case UPDATE_CAROUSEL: return {
      updateCarouselResponseIsLoaded: true,
      updateCarouselResponse: action.payload,
    }
    case DELETE_CAROUSEL: return {
      ddeleteCarouselResponseIsLoaded: true,
      ddeleteCarouselResponse: action.payload,
    }
    default: return state
  }
}

export default carouselOperationsReducer