
import toast  from "react-hot-toast"
const setTitle =(title) => {
document.title = title;
};

const isUserLogin =() =>{
    const userjwtToken =localStorage.getItem("userjwtToken");
    return !!userjwtToken;
};

const getUserjwtToken = ()=>{
const userjwtToken =localStorage.getItem("userjwtToken");
return !!userjwtToken
};


const getUserData =() =>{
 const userData= localStorage.getItem("userData") || "{}";
 return JSON.parse(userData);
};

const logoutUser =() => {
    localStorage.clear();
    toast.success("Logged out successfully ");
    setTimeout(()=>{
        window.location.href= "/login";
    }, 1500);

};


export {
    setTitle, 
    isUserLogin,
    getUserjwtToken,
    getUserData,
    logoutUser,
};