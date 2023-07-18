import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryItem, editCategory, getAllCategoryData2, getSpecificCategory, removeCategory } from "../../Redux/Actions/categoryAction";
import addImage from "../../Assets/images/add-image.png";
import ToastifyNotification from "../../Hooks/ToastifyNotification";
import Swal from "sweetalert2";




const AdminAddCategoryHook = () => {

  const [notify] = ToastifyNotification()

  const [img, setImg] = useState(addImage);
  const [selectedImg, setSelectedImg] = useState(null);
  const [text, setText] = useState("");

  const [editCategoryID, setEditCategoryID] = useState('');

  const dispatch = useDispatch();
  const createCategoryResponse = useSelector((state) => state.categoryReducer.category);
  const createCategoryResponseIsLoaded = useSelector((state) => state.categoryReducer.isLoaded);
  const allCategoryData = useSelector(state => state.category2Reducer.allCategoryData);
  const allCategoryDataIsLoaded = useSelector(state => state.category2Reducer.allCategoryDataIsLoaded);
  const removeCategoryResponse = useSelector(state => state.categoryReducer.removeCategoryResponse);
  const removeCategoryResponseIsLoaded = useSelector(state => state.categoryReducer.removeCategoryResponseIsLoaded);
  const specificCategoryData = useSelector(state => state.categoryReducer.specificCategoryData);
  const specificCategoryDataIsLoaded = useSelector(state => state.categoryReducer.specificCategoryDataIsLoaded);
  const editCategoryResponse = useSelector(state => state.categoryReducer.editCategoryResponse);
  const editCategoryResponseIsLoaded = useSelector(state => state.categoryReducer.editCategoryResponseIsLoaded);

  const [loader, setLoader] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [removeCategoryIsClicked, setRemoveCategoryIsClicked] = useState(false);
  const [editCategoryIsClicked, setEditCategoryIsClicked] = useState(false);
  const [updateEditData, setUpdateEditData] = useState(false)
  const [saveBtnIsClicked, setSaveBtnIsClicked] = useState(false);

  // useEffect(() => {
  //   // dispatch(getAllCategoryData2("AdminAddCategoryHook"))
  //   // eslint-disable-next-line
  // }, [])

  const fileInputOnChangeHandle = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    setSelectedImg(e.target.files[0]);
  };

  const textInputOnChangeHandle = (e) => {
    setText(e.target.value);
  }


  // ------------------------------------------------------------------------------------------------------------
  // add category

  const addBtnOnClickHandle = async (e) => {
    e.preventDefault();
    if(!selectedImg){
      notify("info", "اضف صورة التصنيف")
      return
    } else if(!text){
      notify("info", "اضف اسم التصنيف")
      return
    }

    const formData = new FormData();
    formData.append("name", text);
    formData.append("image", selectedImg);
    setLoader(true)
    await dispatch(createCategoryItem(formData, "AdminAddCategoryHook"));
    setLoader(false)
    setIsClicked(true)
  };

  useEffect(() => {
    if (createCategoryResponseIsLoaded && isClicked) {
      if (createCategoryResponse.status === 201){
        dispatch(getAllCategoryData2("AdminAddCategoryHook"))
        notify("success", "تم اضافة التصنيف بنجاح");
        setImg(addImage);
        setText("");
        setSelectedImg(null);
      } else {

        createCategoryResponse?.response?.data?.error?.map(item => {
          if (item.msg === "Category name must be at least 2 characters") {
            notify("warning", "اسم التصنيف يجب الا يقل عن حرفين")
          }
          if (item.msg === "Category name must be at most 32 characters") {
            notify("warning", "اسم التصنيف يجب الا يزيد عن 32 حرف")
          }
        })
      }
    } else if (!createCategoryResponseIsLoaded && isClicked) {
      notify("error", "حدث خطأ فى عملية الاضافة حاول مرة اخرى");
    }
    setIsClicked(false)
    // eslint-disable-next-line
  }, [isClicked]);


  // ------------------------------------------------------------------------------------------------------------
  // remove category

  const removeCategoryOnClickHandle = (id) => { // 
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
        dispatch(removeCategory(id, "AdminAddCategoryHook")).then(() => { // الزن دى بدل الاسينك والاويت
          setRemoveCategoryIsClicked(true)
        })
      }
    })
  }

  useEffect(() => {
    if (removeCategoryResponseIsLoaded && removeCategoryIsClicked) {
      if (removeCategoryResponse.status === 200){
        Swal.fire(
          'تم الحذف!',
          'تم حذف التصنيف بنجاح.',
          'success',
        )
        dispatch(getAllCategoryData2("AdminAddCategoryHook"))
        setImg(addImage);
        setText("");
        setSelectedImg(null);
      } 
      


    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (removeCategoryResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && removeCategoryIsClicked) {
      Swal.fire(
          'غير مسموح بالحذف!',
          'محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله.',
          'warning',
        )
      // notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
    }
  //------------------------------------------------------------------------------------------------------------------



      else {

        if (removeCategoryResponse?.response?.data?.error?.statusMessage) {
          if (removeCategoryResponse?.response?.data?.error?.statusMessage === "Invalid document id") {
            Swal.fire(
          'لم يتم الحذف!',
          'هناك مشكلة فى عملية الحذف حاول مرة اخرى.',
          'error',
        )
          }
        } else {
          if (removeCategoryResponse?.code === "ERR_NETWORK") {
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
    setRemoveCategoryIsClicked(false)
    // eslint-disable-next-line
  }, [removeCategoryIsClicked])


  //-------------------------------------------------------------------------------------------------------------------
  // edit category

  const editCategoryOnClickHandle = async (id) => {
    setEditCategoryID(id)
    await dispatch(getSpecificCategory(id, "AdminAddCategoryHook"))
    setEditCategoryIsClicked(true)
    setUpdateEditData(true)
    // window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (specificCategoryData?.status === 200){
      window.scrollTo(0, 0)
      setText(specificCategoryData.data?.name)
      setImg(specificCategoryData.data?.image)

      setSelectedImg(specificCategoryData.data?.image.split("/")[4])
    }
    setUpdateEditData(false)
    // eslint-disable-next-line
  }, [updateEditData])



  //------------------------------------------------------------------------------------------------------------------
  // Protected Content
  useEffect(() => {
    if (specificCategoryData?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && editCategoryIsClicked) {
      Swal.fire(
          'غير مسموح بالتعديل!',
          'محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله.',
          'warning',
        )
      // notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
      setImg(addImage);
      setText("");
      setSelectedImg(null);

      setEditCategoryIsClicked(false)
      setUpdateEditData(false)
    }
}, [updateEditData])
//------------------------------------------------------------------------------------------------------------------




  const saveBtnOnClickHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", text);
    formData.append("image", selectedImg);
    setLoader(true)
    await dispatch(editCategory(editCategoryID, formData, "AdminAddCategoryHook"))
    setLoader(false)
    setSaveBtnIsClicked(true)
    dispatch(getAllCategoryData2("AdminAddCategoryHook"))
  }

  useEffect(() => {
    if (editCategoryResponseIsLoaded && saveBtnIsClicked) {
      if (editCategoryResponse.status === 201){
        notify("success", "تم تعديل التصنيف بنجاح");
        setImg(addImage);
        setText("");
        setSelectedImg(null);
        setEditCategoryIsClicked(false)
      } else {

        editCategoryResponse?.response?.data?.error?.map(item => {
          if (item.msg === "Category name must be at least 2 characters") {
            notify("warning", "اسم التصنيف يجب الا يقل عن حرفين")
          }
          if (item.msg === "Category name must be at most 32 characters") {
            notify("warning", "اسم التصنيف يجب الا يزيد عن 32 حرف")
          }
        })
      }
    } else if (!editCategoryResponseIsLoaded && saveBtnIsClicked) {
      notify("error", "خطأ فى عملية التعديل حاول مرة اخرى");
    }
    setSaveBtnIsClicked(false)
    // eslint-disable-next-line
  }, [saveBtnIsClicked]);




  return [img, fileInputOnChangeHandle, textInputOnChangeHandle, text, addBtnOnClickHandle, loader, allCategoryDataIsLoaded, allCategoryData, removeCategoryOnClickHandle, editCategoryOnClickHandle, editCategoryIsClicked, saveBtnOnClickHandle]

}

export default AdminAddCategoryHook