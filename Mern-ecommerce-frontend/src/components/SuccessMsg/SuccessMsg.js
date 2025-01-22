import Swal from "sweetalert2";

const SuccessMsg = ({ message }) => {
  Swal.fire({
    title: "Added!",
    text: message,
    icon: "success",
    confirmButtonText: "Cool"
  });
};

export default SuccessMsg;
