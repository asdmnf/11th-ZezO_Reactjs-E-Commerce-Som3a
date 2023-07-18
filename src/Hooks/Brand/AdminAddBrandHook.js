

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addImage from "../../Assets/images/add-image.png";
import { createBrandData, editBrand, getAllBrandData2, getSpecificBrand, removeBrand } from "../../Redux/Actions/brandAction";
import ToastifyNotification from "../ToastifyNotification";
import Swal from 'sweetalert2'

const AdminAddBrandHook = () => {

  const [notify] = ToastifyNotification();

  const [img, setImg] = useState(addImage);
  const [text, setText] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

  const [editBrandID, setEditBrandID] = useState('');

  const dispatch = useDispatch();
  const createBrandResponse = useSelector(state => state.brandReducer.brandData);
  const createBrandResponseIsLoaded = useSelector(state => state.brandReducer.isLoaded);
  const allBrandData = useSelector(state => state.brand2Reducer.allBrandData);
  const allBrandDataIsLoaded = useSelector(state => state.brand2Reducer.allBrandDataIsLoaded);
  const removeBrandResponse = useSelector(state => state.brandReducer.removeBrandResponse);
  const removeBrandResponseIsLoaded = useSelector(state => state.brandReducer.removeBrandResponseIsLoaded);
  const specificBrandData = useSelector(state => state.brandReducer.specificBrandData);
  const specificBrandDataIsLoaded = useSelector(state => state.brandReducer.specificBrandDataIsLoaded);
  const editBrandResponse = useSelector(state => state.brandReducer.editBrandResponse);
  const editBrandResponseIsLoaded = useSelector(state => state.brandReducer.editBrandResponseIsLoaded);

  const [loader, setLoader] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [removeBrandIsClicked, setRemoveBrandIsClicked] = useState(false);
  const [editBrandIsClicked, setEditBrandIsClicked] = useState(false);
  const [updateEditData, setUpdateEditData] = useState(false)
  const [saveBtnIsClicked, setSaveBtnIsClicked] = useState(false);

  // useEffect(() => {
  //   // dispatch(getAllBrandData2("AdminAddBrandHook"))
  // }, [])
  

  const fileInputOnChangeHandle = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    setSelectedImg(e.target.files[0]);
  };

  const textInputOnChangeHandle = (e) => {
    setText(e.target.value);
  };


  // ------------------------------------------------------------------------------------------------------------
  // add brand

  const addBtnOnClickHandle = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      notify("info", "اضف صورة الماركة");
      return
    } else if (!text) {
      notify("info", "اضف اسم الماركة");
      return
    }
    const formData = new FormData();
    formData.append("name", text);
    formData.append("image", selectedImg);

    setLoader(true)
    await dispatch(createBrandData(formData, "AdminAddBrandHook"));
    setLoader(false)
    setIsClicked(true)
  };

  useEffect(() => {
    if (createBrandResponseIsLoaded && isClicked) {
      if (createBrandResponse.status === 201){
        notify("success", "تمت اضافة الماركة بنجاح");
        dispatch(getAllBrandData2("AdminAddBrandHook"))
        setImg(addImage);
        setText("");
        setSelectedImg(null);
      } else {

        if (createBrandResponse.code === "ERR_NETWORK") {
          notify("error", "خطأ فى الاتصال بالسيرفر حاول مرة اخرى")
        }

        createBrandResponse?.response?.data?.error?.map(item => {
          if (item.msg === "brand name must be at least 2 characters") {
            notify("warning", "اسم الماركة يجب الا يقل عن حرفين")
          }
          if (item.msg === "brand name must be at most 32 characters") {
            notify("warning", "اسم الماركة يجب الا يزيد عن 32 حرف")
          }
        })
      }
    } else if (!createBrandResponseIsLoaded && isClicked) {
      notify("error", "خطأ فى عملية الاضافة حاول مرة اخرى");
    }
    setIsClicked(false)
    // eslint-disable-next-line
  }, [isClicked]);

  // ------------------------------------------------------------------------------------------------------------
  // remove brand

  const removeBrandOnClickHandle = (id) => {
    Swal.fire({
      title: 'هل انت متأكد ؟',
      text: "عملية الحذف ستتم بشكل نهائى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم, احذف الماركة!',
      cancelButtonText: 'رجوع',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeBrand(id, "AdminAddBrandHook")).then(() => {
          setRemoveBrandIsClicked(true)
        })
      }
    })
  }

  useEffect(() => {
    if (removeBrandResponseIsLoaded && removeBrandIsClicked) {
      if (removeBrandResponse.status === 200 && removeBrandIsClicked){
        Swal.fire(
          'تم الحذف!',
          'تم حذف الماركة بنجاح.',
          'success',
        )
        dispatch(getAllBrandData2("AdminAddBrandHook"))
        setImg(addImage);
        setText("");
        setSelectedImg(null);
      } 


    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (removeBrandResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && removeBrandIsClicked) {
      Swal.fire(
          'غير مسموح بالحذف!',
          'محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله.',
          'warning',
        )
      // notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
    }
  //------------------------------------------------------------------------------------------------------------------
      
      
      else {

        if (removeBrandResponse?.response?.data?.error?.statusMessage) {
          if (removeBrandResponse?.response?.data?.error?.statusMessage === "Invalid document id") {
            Swal.fire(
          'لم يتم الحذف!',
          'هناك مشكلة فى عملية الحذف حاول مرة اخرى.',
          'error',
        )
          }
        } else {
          if (removeBrandResponse?.code === "ERR_NETWORK") {
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
    setRemoveBrandIsClicked(false)
    // eslint-disable-next-line
  }, [removeBrandIsClicked])




  //-------------------------------------------------------------------------------------------------------------------
  // edit brand

  const editBrandOnClickHandle = async (id) => { 
    setEditBrandID(id)
    await dispatch(getSpecificBrand(id, "AdminAddBrandHook"))
    setEditBrandIsClicked(true)
    setUpdateEditData(true)
    // window.scrollTo(0, 0)
  }


  useEffect(() => {
    if (specificBrandData.status === 200){
      window.scrollTo(0, 0)
      setText(specificBrandData.data?.name)
      setImg(specificBrandData.data?.image)


      setSelectedImg(specificBrandData.data?.image.split("/")[4]) 
    }
    setUpdateEditData(false)
    // eslint-disable-next-line
  }, [updateEditData])



  //------------------------------------------------------------------------------------------------------------------
  // Protected Content
  useEffect(() => {
    if (specificBrandData?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && editBrandIsClicked) {
      Swal.fire(
          'غير مسموح بالتعديل!',
          'محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله.',
          'warning',
        )
      // notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
      setImg(addImage);
      setText("");
      setSelectedImg(null);

      setEditBrandIsClicked(false)
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
    await dispatch(editBrand(editBrandID, formData, "AdminAddBrandHook"))
    setLoader(false)
    setSaveBtnIsClicked(true)
    dispatch(getAllBrandData2("AdminAddBrandHook"))
  }

  useEffect(() => {
    if (editBrandResponseIsLoaded && saveBtnIsClicked) {
      if (editBrandResponse.status === 201){
        notify("success", "تم تعديل الماركة بنجاح");
        setImg(addImage);
        setText("");
        setSelectedImg(null);
        setEditBrandIsClicked(false)
      } else {

        if (editBrandResponse.code === "ERR_NETWORK") {
          notify("error", "خطأ فى الاتصال بالسيرفر حاول مرة اخرى")
        }

        editBrandResponse?.response?.data?.error?.map(item => {
          if (item.msg === "brand name must be at least 2 characters") {
            notify("warning", "اسم الماركة يجب الا يقل عن حرفين")
          }
          if (item.msg === "brand name must be at most 32 characters") {
            notify("warning", "اسم الماركة يجب الا يزيد عن 32 حرف")
          }
        })
      }
    } else if (!editBrandResponseIsLoaded && saveBtnIsClicked) {
      notify("error", "خطأ فى عملية التعديل حاول مرة اخرى");
    }
    setSaveBtnIsClicked(false)
    // eslint-disable-next-line
  }, [saveBtnIsClicked]);



  return [img, fileInputOnChangeHandle, textInputOnChangeHandle, text, addBtnOnClickHandle, loader, allBrandDataIsLoaded, allBrandData, removeBrandOnClickHandle, editBrandOnClickHandle, editBrandIsClicked, saveBtnOnClickHandle]
};

export default AdminAddBrandHook;
