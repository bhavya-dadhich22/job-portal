import { useCookies } from "react-cookie";

const useToken = () => {
    const [cookies, setCookie] = useCookies(['token']);
    return cookies.token;
};

export default useToken;
