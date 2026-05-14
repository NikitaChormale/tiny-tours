import toast  from "react-hot-toast"
const setTitle =(title) => {
document.title = title;
};

const isUserLogin =() =>{
    const userjwtToken =localStorage.getItem("userjwtToken");
    return !!userjwtToken;
}; 



 const getUserjwtToken = ()=>{
return localStorage.getItem("userjwtToken");
 };

/*
 const getUserData =() => {
 const userData= localStorage.getItem("userData") || "{}";

return JSON.parse(userData);
}; 
*/

 const getUserData = () => {
  try {
    const userData = localStorage.getItem("userData") || "{}";
    return JSON.parse(userData);
  } catch (error) {
    console.log("Invalid JSON");
    return {};
  }
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