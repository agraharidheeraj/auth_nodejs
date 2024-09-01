const Cookies  = require("universal-cookie");

const cookies = new Cookies();
export const isTokenPresent = () =>{
    const token = cookies.get("token");  
    return !!token;
}
