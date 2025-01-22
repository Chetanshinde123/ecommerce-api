// import Admin from "../Admin/Admin";

const AdminRoute = ({children}) => {
    
    const user = JSON.parse(localStorage.getItem("userInfo"))

    const isAdmin = user?.userFound?.isAdmin ? true : false;
    if(!isAdmin) return <h1>Access Denied</h1>

    return <>{children}</>
}

export default AdminRoute