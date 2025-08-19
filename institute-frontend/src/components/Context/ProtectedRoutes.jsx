import React, { useContext } from "react";
import { userContext } from "./ContextProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children,roles}) => {
    const {role,authenticated} = useContext(userContext)

    if(!authenticated){
        return<Navigate to= "/login"/>
    }

    if(roles.includes(role)){
        return<Navigate to= "/"/>
    }

    return children;
}

export default ProtectedRoute;