import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { config } from "../../../../../dashboard/src/Config/configure";
import { toast } from "react-toastify";
export const SellerContext = createContext();
export default function Context({ children }) {
  const { pathname } = useLocation();
  const { host } = config;
  const navigate = useNavigate();
  const [state, setState] = useState(true);
  const [seller, setSeller] = useState(null);
  const [activeOption, setActiveOption] = useState("/Dashboard");
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
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
    let token = localStorage.getItem("sellerToken");
    axios
      .get(`${host}/seller/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setSeller(res.data.seller);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("sellerToken") != null) {
      getProfile();
    } else {
      setSeller(null);
      if (pathname!="/Register") {
        navigate("/");
      }
    }
  }, [state, pathname]);
  const Register = async (data) => {
    axios
      .post(`${host}/seller/Register`, data)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          //   directAlert("success", res.data.message, 3000);
          toast.success(res.data.message);
          navigate("/");
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
      .post(`${host}/seller/Login`, data)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("sellerToken", res.data.token);
          setState(!state);
          //   autoCloseAlert(
          //     res.data.message,
          //     "You will redirected to the home page ",
          //     2000
          //   );
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/Dashboard");
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

  const LogoutSeller = () => {
    localStorage.removeItem("sellerToken");
    setState(!state);
    toast.error("Logged out successfully");
    navigate("/");
  };

  const handleLogoutSeller = () => {
    confirmation(
      "You want to logout",
      "Yes, Logout",
      "your account is safe!",
      "Logged out!",
      "You have been logged out from your account!",
      LogoutSeller
    );
  };
  const updateProfile = async (data) => {
    let token = localStorage.getItem("sellerToken");
    axios
      .put(`${host}/seller/updateProfile`, data, {
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
  const viewAllCategory = async () => {
    let token = localStorage.getItem("sellerToken");
    axios
      .get(`${host}/seller/viewAllCategory`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setAllCategories(res.data.categories);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const viewAllProducts = async () => {
    let token = localStorage.getItem("sellerToken");
    axios
      .get(`${host}/seller/viewAllProducts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setAllProducts(res.data.products);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const insertProduct = async (data) => {
    let token = localStorage.getItem("sellerToken");
    axios
      .post(`${host}/seller/insertProduct`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          viewAllProducts();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateProduct = async (id, data) => {
    let token = localStorage.getItem("sellerToken");
    axios
      .put(`${host}/seller/updateProduct/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          viewAllProducts();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllRequests = async () => {
    let token = localStorage.getItem("sellerToken");
    axios
      .get(`${host}/seller/getAllRequests`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setAllOrders(res.data.requests);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updatedStatus = async (id, data) => {
    let token = localStorage.getItem("sellerToken");
    axios
      .put(`${host}/seller/updatedStatus/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getAllRequests();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <SellerContext.Provider
      value={{
        state,
        host,
        setState,
        seller,
        setSeller,
        handleLogoutSeller,
        LogoutSeller,
        Login,
        Register,
        getProfile,
        navigate,
        pathname,
        activeOption,
        setActiveOption,
        updateProfile,
        viewAllCategory,
        viewAllProducts,
        insertProduct,
        allCategories,
        allProducts,
        updateProduct,
        getAllRequests,
        updatedStatus,
        allOrders,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
}
