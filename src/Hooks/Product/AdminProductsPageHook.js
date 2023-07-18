import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { deleteProduct, getHomeProduct, homeDevicesProductsAction, marketProductsAction, mostSalesProductsAction, samsungProductsAction } from "../../Redux/Actions/productAction/productAction"


const AdminProductsPageHook = () => {

  const dispatch = useDispatch()
  // useEffect(() => {
  //   // dispatch(getHomeProduct("AdminProductsPageHook"))
  //   // eslint-disable-next-line
  // }, [])

  const productData = useSelector(state => state.productHomeReducer.product?.data)
  const productDataIsLoaded = useSelector(state => state.productHomeReducer.isLoaded)
  const deletedProductResponse = useSelector(state => state.deleteProductReducer.deletedProductResponse)
  const deletedProductResponseIsLoaded = useSelector(state => state.deleteProductReducer.isLoaded)
  const [isClicked, setIsClicked] = useState(false)

  // remove product

  const productDeleteIconOnClickHandle = (productId) => { 
    Swal.fire({
      title: 'هل انت متأكد ؟',
      text: "عملية الحذف ستتم بشكل نهائى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم, احذف المنتج!',
      cancelButtonText: 'رجوع',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(productId, "AdminProductsPageHook")).then(() => {
          setIsClicked(true)
        })
      }
    })
  }

  useEffect(() => {
    if (deletedProductResponseIsLoaded && isClicked) {
      if (deletedProductResponse?.status === 200){
        Swal.fire(
          'تم الحذف!',
          'تم حذف المنتج بنجاح.',
          'success',
        )

        
        dispatch(getHomeProduct("HeaderCartButtonHook-NewProducts"))
        dispatch(mostSalesProductsAction("HeaderCartButtonHook", 8, "&sort=-sold"))
        dispatch(marketProductsAction("HeaderCartButtonHook", 8, "&mainCategory=646402b6112a846cfcecc97c"))
        dispatch(homeDevicesProductsAction("HeaderCartButtonHook", 8, "&mainCategory=6466be98de0a035fda036340"))
        dispatch(samsungProductsAction("HeaderCartButtonHook", 8, "&brand=6466c273de0a035fda03635d"))
      } 


    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (deletedProductResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && isClicked) {
      Swal.fire(
          'غير مسموح بالحذف!',
          'محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله.',
          'warning',
        )
      // notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
    }
  //------------------------------------------------------------------------------------------------------------------
      
      
      
      else {

        if (deletedProductResponse?.response?.data?.error?.statusMessage) {
          if (deletedProductResponse?.response?.data?.error?.statusMessage === "Invalid document id") {
            Swal.fire(
          'لم يتم الحذف!',
          'هناك مشكلة فى عملية الحذف حاول مرة اخرى.',
          'error',
        )
          }
        } else {
          if (deletedProductResponse?.code === "ERR_NETWORK") {
            Swal.fire(
          'لم يتم الحذف!',
          'هناك مشكلة فى الاتصال بالسيرفر حاول مرة اخرى.',
          'error',
        )
          } else {
            Swal.fire(
          'لم يتم الحذف!',
          'هناك مشكلة فى عملية الحذف حاول مرة اخرى.',
          'error',
        )
          }
        }
      }
    }
    setIsClicked(false)
    // eslint-disable-next-line
  }, [isClicked])
  



  return [productData, productDataIsLoaded, productDeleteIconOnClickHandle]
}

export default AdminProductsPageHook