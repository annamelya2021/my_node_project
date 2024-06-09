import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/local";


const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = getToken();
    useEffect(() => {
        if (token) {
            navigate('/login', {replace: true})
        }
    }, [token, navigate]);
    return children;
};
export default ProtectedRoute