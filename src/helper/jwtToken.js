import Cookies from "js-cookie";
// const jwtToken = Cookies.get("jwtToken");
export default  function jwtToken(){
    return Cookies.get("AdminToken");
}