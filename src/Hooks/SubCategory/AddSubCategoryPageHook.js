import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { getAllCategoryData2 } from "../../Redux/Actions/categoryAction"
import { createSubCategory, editSubCategory, getAllSubCategoryData2, getSpecificSubCategory, removeSubCategory } from "../../Redux/Actions/subCategoryAction"
import ToastifyNotification from "../ToastifyNotification"


const AddSubCategoryPageHook = () => {

  const [notify] = ToastifyNotification()

  const [text, setText] = useState("")
  const [option, setOption] = useState("")

  const [editSubCategoryID, setEditSubCategoryID] = useState('');

  const dispatch = useDispatch();
  const allCategoryData = useSelector(state => state.category2Reducer.allCategoryData);
  const allCategoryDataIsLoaded = useSelector(state => state.category2Reducer.allCategoryDataIsLoaded);
  const allSubCategoryData = useSelector(state => state.subCategory2Reducer.allSubCategoryData);
  const allSubCategoryDataIsLoaded = useSelector(state => state.subCategory2Reducer.allSubCategoryDataIsLoaded);
  const createSubCategoryResponse = useSelector((state) => state.subCategoryReducer.subCategoryData);
  const createSubCategoryResponseIsLoaded = useSelector((state) => state.subCategoryReducer.isLoaded);
  const removeSubCategoryResponse = useSelector(state => state.subCategoryReducer.removeSubCategoryResponse);
  const removeSubCategoryResponseIsLoaded = useSelector(state => state.subCategoryReducer.removeSubCategoryResponseIsLoaded);
  const specificSubCategoryData = useSelector(state => state.subCategoryReducer.specificSubCategoryData);
  const specificSubCategoryDataIsLoaded = useSelector(state => state.subCategoryReducer.specificSubCategoryDataIsLoaded);
  const editSubCategoryResponse = useSelector(state => state.subCategoryReducer.editSubCategoryResponse);
  const editSubCategoryResponseIsLoaded = useSelector(state => state.subCategoryReducer.editSubCategoryResponseIsLoaded);

  const [loader, setLoader] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [removeSubCategoryIsClicked, setRemoveSubCategoryIsClicked] = useState(false);
  const [editSubCategoryIsClicked, setEditSubCategoryIsClicked] = useState(false);
  const [updateEditData, setUpdateEditData] = useState(false)
  const [saveBtnIsClicked, setSaveBtnIsClicked] = useState(false);

  useEffect(() => { 
    // dispatch(getAllCategoryData2("AddSubCategoryPageHook")) 
    dispatch(getAllSubCategoryData2("AddSubCategoryPageHook"))
    // eslint-disable-next-line
  }, [])
  

  const textInputOnChangeHandle = (e) => {
    setText(e.target.value)
  }

  const selectOnChangeHandle = (e) => {
    setOption(e.target.value)
  }

    // ------------------------------------------------------------------------------------------------------------
  // add subCategory

  const addBtnOnClickHandle = async (e) => {
    e.preventDefault()
    if (!text) {
      notify("info", "اضف اسم التصنيف الفرعى");
      return
    } else if (!option) {
      notify("info", "اختر التصنيف الرئيسى");
      return 
    }
    const postData = {
      "name": text,
      "mainCategory": option
    }
    setLoader(true)
    await dispatch(createSubCategory(postData, "AddSubCategoryPageHook"))
    setLoader(false)
    setIsClicked(true)
  }

  useEffect(() => {
    if (createSubCategoryResponseIsLoaded && isClicked) {
      if (createSubCategoryResponse.status === 201){
        dispatch(getAllSubCategoryData2("AddSubCategoryPageHook"))
        notify("success", "تم اضافة التصنيف الفرعى بنجاح");
        setText("")
        setOption("")
      } else {

        createSubCategoryResponse?.response?.data?.error.map(item => {
          if (item.msg === "subcategory must be at least 2 characters") {
            notify("warning", "التصنيف الفرعى يجب الا يقل عن حرفين")
          }
          if (item.msg === "subcategory must be at most 32 characters") {
            notify("warning", "التصنيف الفرعى يجب الا يزيد عن 32 حرف")
          }
        })
      }

    } else if (!createSubCategoryResponseIsLoaded && isClicked) {
      notify("error", "خطأ فى عملية الاضافة حاول مرة اخرى");
    }
    setIsClicked(false)
    // eslint-disable-next-line
  }, [isClicked]);


    // ------------------------------------------------------------------------------------------------------------
  // remove subCategory

  const removeSubCategoryOnClickHandle = (id) => { 
    Swal.fire({
      title: 'هل انت متأكد ؟',
      text: "عملية الحذف ستتم بشكل نهائى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم, احذف التصنيف!',
      cancelButtonText: 'رجوع',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeSubCategory(id, "AdminAddSubCategoryHook")).then(() => {
          setRemoveSubCategoryIsClicked(true)
        })
      }
    })
  }

  useEffect(() => {
    if (removeSubCategoryResponseIsLoaded && removeSubCategoryIsClicked) {
      if (removeSubCategoryResponse.status === 200){
        Swal.fire(
          'تم الحذف!',
          'تم حذف التصنيف الفرعى بنجاح.',
          'success',
        )
        dispatch(getAllSubCategoryData2("AdminAddSubCategoryHook"))
        setText("")
        setOption("")
      }
      
      

    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (removeSubCategoryResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && removeSubCategoryIsClicked) {
      Swal.fire(
          'غير مسموح بالحذف!',
          'محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله.',
          'warning',
        )
      // notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
    }
  //------------------------------------------------------------------------------------------------------------------

      
      
      else {

        if (removeSubCategoryResponse?.response?.data?.error?.statusMessage) {
          if (removeSubCategoryResponse?.response?.data?.error?.statusMessage === "Invalid document id") {
            Swal.fire(
          'لم يتم الحذف!',
          'هناك مشكلة فى عملية الحذف حاول مرة اخرى.',
          'error',
        )
          }
        } else {
          if (removeSubCategoryResponse?.code === "ERR_NETWORK") {
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
    setRemoveSubCategoryIsClicked(false)
    // eslint-disable-next-line
  }, [removeSubCategoryIsClicked])


  //-------------------------------------------------------------------------------------------------------------------
  // edit subCategory

  const editSubCategoryOnClickHandle = async (id) => {
    setEditSubCategoryID(id)
    await dispatch(getSpecificSubCategory(id, "AdminAddSubCategoryHook"))
    setEditSubCategoryIsClicked(true)
    setUpdateEditData(true)
    // window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (specificSubCategoryData?.status === 200){
      window.scrollTo(0, 0)
      setText(specificSubCategoryData.data?.name)
      setOption(specificSubCategoryData.data?.mainCategory)
    }
    setUpdateEditData(false)
    // eslint-disable-next-line
  }, [updateEditData])



  //------------------------------------------------------------------------------------------------------------------
  // Protected Content
  useEffect(() => {
    if (specificSubCategoryData?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && editSubCategoryIsClicked) {
      Swal.fire(
          'غير مسموح بالتعديل!',
          'محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله.',
          'warning',
        )
        // notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
      setText("");
      setOption("");

      setEditSubCategoryIsClicked(false)
      setUpdateEditData(false)
    }
}, [updateEditData])
//------------------------------------------------------------------------------------------------------------------



  const saveBtnOnClickHandle = async (e) => {
    e.preventDefault();
    const postData = {
      "name": text,
      "mainCategory": option
    }
    setLoader(true)
    await dispatch(editSubCategory(editSubCategoryID, postData, "AdminAddSubCategoryHook"))
    setLoader(false)
    setSaveBtnIsClicked(true)
    dispatch(getAllSubCategoryData2("AdminAddSubCategoryHook"))
  }

  useEffect(() => {
    if (editSubCategoryResponseIsLoaded && saveBtnIsClicked) {
      if (editSubCategoryResponse.status === 201){
        notify("success", "تم تعديل التصنيف الفرعى بنجاح");
        setText("")
        setOption("")
        setEditSubCategoryIsClicked(false)
      } else {

        if (editSubCategoryResponse?.response?.data?.error?.statusMessage) {
          if (editSubCategoryResponse?.response?.data?.error?.statusMessage === "Invalid document id") {
            notify("error", "خطأ فى عملية التعديل حاول مرة اخرى")
          }
        } else {
          editSubCategoryResponse?.response?.data?.error.map(item => {
            if (item.msg === "subcategory must be at least 2 characters") {
              notify("warning", "التصنيف الفرعى يجب الا يقل عن حرفين")
            }
            if (item.msg === "subcategory must be at most 32 characters") {
              notify("warning", "التصنيف الفرعى يجب الا يزيد عن 32 حرف")
            }
          })
        }
      }
    } else if (!editSubCategoryResponseIsLoaded && saveBtnIsClicked) {
      notify("error", "خطأ فى عملية التعديل حاول مرة اخرى");
    }
    setSaveBtnIsClicked(false)
    // eslint-disable-next-line
  }, [saveBtnIsClicked]);

  
  
  return [text, option, textInputOnChangeHandle, selectOnChangeHandle, addBtnOnClickHandle, loader, allCategoryDataIsLoaded, allCategoryData,  allSubCategoryDataIsLoaded, allSubCategoryData, removeSubCategoryOnClickHandle, editSubCategoryOnClickHandle, editSubCategoryIsClicked, saveBtnOnClickHandle]
}

export default AddSubCategoryPageHook