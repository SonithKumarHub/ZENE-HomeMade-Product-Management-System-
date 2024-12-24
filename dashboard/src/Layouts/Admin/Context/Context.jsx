import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { config } from "../../../../../dashboard/src/Config/configure";
import { toast } from "react-toastify";
export const AdminContext = createContext();
export default function Context({ children }) {
  const { pathname } = useLocation();
  const { host } = config;
  const navigate = useNavigate();
  const [state, setState] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [allSellers, setAllSellers] = useState([]);
  const [allBuyers, setAllBuyers] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [activeOption, setActiveOption] = useState("/Admin/Dashboard");
  useEffect(() => {
    setActiveOption(pathname);
  }, [pathname]);
  const autoCloseAlert = (msgTitle, msgHtml, msgTimer) => {
    let timerInterval;
    Swal.fire({
      title: msgTitle,
      html: msgHtml + " in <b></b> milliseconds.",
      timer: msgTimer,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log("I was closed by the timer");
      }
    });
  };

  const confirmation = (
    mainSubTitle,
    confirmButtonLabel,
    cancelMessage,
    successTitle,
    successSubTitle,
    performAction
  ) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: mainSubTitle,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: confirmButtonLabel,
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          performAction();
          swalWithBootstrapButtons.fire({
            title: successTitle,
            text: successSubTitle,
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: cancelMessage,
            icon: "error",
          });
        }
      });
  };
  const directAlert = (type, message, time) => {
    Swal.fire({
      position: "center",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: time,
    });
  };

  const getProfile = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setAdmin(res.data.admin);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken") != null) {
      getProfile();
    } else {
      setAdmin(null);
      navigate("/Admin");
    }
  }, [state, pathname]);
  const Register = async (data) => {
    axios
      .post(`${host}/admin/Register`, data)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          //   directAlert("success", res.data.message, 3000);
          toast.success(res.data.message);
          navigate("/Admin");
        } else {
          toast.error(res.data.message);
          //   directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const Login = async (data) => {
    axios
      .post(`${host}/admin/Login`, data)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("adminToken", res.data.token);
          setState(!state);
          //   autoCloseAlert(
          //     res.data.message,
          //     "You will redirected to the home page ",
          //     2000
          //   );
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/Admin/Dashboard");
          }, 1000);
        } else {
          //   directAlert("error", res.data.message, 2000);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const LogoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setState(!state);
    toast.error("Logged out successfully");
    navigate("/Admin");
  };

  const handleLogoutAdmin = () => {
    confirmation(
      "You want to logout",
      "Yes, Logout",
      "your account is safe!",
      "Logged out!",
      "You have been logged out from your account!",
      LogoutAdmin
    );
  };
  const updateProfile = async (data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateProfile`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setState(!state);
          autoCloseAlert("Updating", "Updating your profile ", 3000);
          setTimeout(() => {
            toast.success(res.data.message);
          }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getAllFeedbacks = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllFeedbacks`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setAllFeedbacks(res.data.feedbacks);
          // setTimeout(() => {
          // }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllSellers = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllSellers`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setAllSellers(res.data.sellers);
          // setTimeout(() => {
          // }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateSellerStatus = async (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateSellerStatus/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getAllSellers();
          toast.success(res.data.message);
          // setTimeout(() => {
          // }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllBuyers = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllBuyers`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setAllBuyers(res.data.buyers);
          // setTimeout(() => {
          // }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateBuyerStatus = async (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateBuyerStatus/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getAllBuyers();
          // autoCloseAlert("Updating", "Updating your profile ", 3000);
          toast.success(res.data.message);
          // setTimeout(() => {
          // }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllProducts = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllProducts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setAllProducts(res.data.products);
          // setTimeout(() => {
          // }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateProduct = async (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateProduct/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getAllProducts();
          // autoCloseAlert("Updating", "Updating your profile ", 3000);
          toast.success(res.data.message);
          // setTimeout(() => {
          // }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllCategory = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllCategory`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setAllCategories(res.data.categories);
          // setTimeout(() => {
          // }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const insertCategory = async (data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .post(`${host}/admin/insertCategory`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getAllCategory();
          // autoCloseAlert("Updating", "Updating your profile ", 3000);
          toast.success(res.data.message);
          // setTimeout(() => {
          // }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateCategory = async (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateCategory/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getAllCategory();
          // autoCloseAlert("Updating", "Updating your profile ", 3000);
          toast.success(res.data.message);
          // setTimeout(() => {
          // }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <AdminContext.Provider
      value={{
        state,
        host,
        setState,
        admin,
        setAdmin,
        handleLogoutAdmin,
        LogoutAdmin,
        Login,
        Register,
        getProfile,
        navigate,
        host,
        pathname,
        activeOption,
        setActiveOption,
        updateProfile,
        updateBuyerStatus,
        updateSellerStatus,
        getAllSellers,
        getAllBuyers,
        allSellers,
        allBuyers,
        insertCategory,
        getAllCategory,
        updateCategory,
        allCategories,
        getAllFeedbacks,
        allFeedbacks,
        allProducts,
        getAllProducts,
        updateProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
