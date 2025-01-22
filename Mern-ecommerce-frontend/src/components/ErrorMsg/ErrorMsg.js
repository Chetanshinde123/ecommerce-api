import Swal from 'sweetalert2'
import { resetErrAction } from '../../redux/slices/globalActions/globalActions'
import {useDispatch } from "react-redux"

const ErrorMsg = ({message}) => {
  const dispatch = useDispatch()
    Swal.fire({
    title: 'Oops!',
    text: message,
    icon: 'error',
    confirmButtonText: 'Okay'
  })
  dispatch(resetErrAction())
}

export default ErrorMsg