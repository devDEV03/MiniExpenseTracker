import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://expense-backend-wawe.onrender.com/api",
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            try {
                console.log("Generating refresh token");
                
                const res = await axios.post("https://expense-backend-wawe.onrender.com/api/user/refresh-token", {}, { withCredentials: true });
                const newAccessToken = res.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);
                error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(error.config);

            } catch (refreshError) {
                
                console.error("Refresh Token Expired. Logging Out.");
                localStorage.removeItem("accessToken");
                window.location.href = "/"; 
                return Promise.reject(refreshError);
            
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;