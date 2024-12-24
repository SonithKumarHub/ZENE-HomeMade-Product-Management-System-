import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { config } from "../../../Config/configure";
export const BuyerContext = createContext();
export default function Context({ children }) {
  const { pathname } = useLocation();
  const { host } = config;
  const navigate = useNavigate();
  const [state, setState] = useState(true);
  const [buyer, setBuyer] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);

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
    let token = localStorage.getItem("buyerToken");
    axios
      .get(`${host}/buyer/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setBuyer(res.data.buyer);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("buyerToken") != null) {
      getProfile();
    } else {
      setBuyer(null);
      // navigate("/");
    }
  }, [state]);
  const submitFeedback = async (data) => {
    axios
      .post(`${host}/buyer/submitFeedback`, data)
      .then((res) => {
        if (res.data.success) {
          //   directAlert("success", res.data.message, 3000);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
          //   directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const Register = async (data) => {
    axios
      .post(`${host}/buyer/Register`, data)
      .then((res) => {
        if (res.data.success) {
          //   directAlert("success", res.data.message, 3000);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
          //   directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateProfile = async (data) => {
    let token = localStorage.getItem("buyerToken");
    axios
      .put(`${host}/buyer/updateProfile`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          //   directAlert("success", res.data.message, 3000);
          getProfile();
          toast.success(res.data.message);
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
      .post(`${host}/buyer/Login`, data)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("buyerToken", res.data.token);
          setState(!state);
          //   autoCloseAlert(
          //     res.data.message,
          //     "You will redirected to the home page ",
          //     2000
          //   );
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          //   directAlert("error", res.data.message, 2000);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };

  const LogoutBuyer = () => {
    localStorage.removeItem("buyerToken");
    setState(!state);
    toast.error("Logged out successfully");
    navigate("/");
  };

  const handleLogoutBuyer = () => {
    confirmation(
      "You want to logout",
      "Yes, Logout",
      "your account is safe!",
      "Logged out!",
      "You have been logged out from your account!",
      LogoutBuyer
    );
  };
  const viewAllCategories = () => {
    axios
      .get(`${host}/buyer/viewAllCategories`)
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const viewAllProducts = () => {
    axios
      .get(`${host}/buyer/viewAllProducts`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const viewSingleProduct = (id) => {
    axios
      .get(`${host}/buyer/viewSingleProduct/${id}`)
      .then((response) => {
        setSingleProduct(response.data.product);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const viewAllRequests = () => {
    let token = localStorage.getItem("buyerToken");
    axios
      .get(`${host}/buyer/viewAllRequests`, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        setOrders(response.data.requests);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const requestForProduct = (data) => {
    let token = localStorage.getItem("buyerToken");
    axios
      .post(`${host}/buyer/requestForProduct`, data, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/Orders");
          }, 2000);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const cancelMyRequest = (id) => {
    let token = localStorage.getItem("buyerToken");
    axios
      .put(
        `${host}/buyer/cancelMyRequest/${id}`,
        {},
        {
          headers: { "auth-token": token },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          toast.success(response.data.message);
          viewAllRequests();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <BuyerContext.Provider
      value={{
        state,
        setState,
        buyer,
        setBuyer,
        handleLogoutBuyer,
        LogoutBuyer,
        Login,
        Register,
        getProfile,
        navigate,
        host,
        pathname,
        submitFeedback,
        updateProfile,
        viewAllCategories,
        viewAllProducts,
        categories,
        products,
        viewSingleProduct,
        singleProduct,
        requestForProduct,
        viewAllRequests,
        orders,
        cancelMyRequest,
      }}
    >
      {children}
    </BuyerContext.Provider>
  );
}
