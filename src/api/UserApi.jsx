import axiosClient from "./axiosClient.jsx";


const userApi={
    login: (email, password) => {
        const url = 'api/login';
        return axiosClient.post(url, { email, password });
    },
    createUser(email, password) {
        const url = 'api/register';
        return axiosClient.post(url, { email, password });
    },
    deleteUser(email, password) {
        const url = 'api/delete';
        return axiosClient.delete(url, { email, password });
    },
    getAllUsers() {
        const url = 'api/users';
        return axiosClient.get(url);
    },
    forgotPassword(email, password) {
        const url = 'api/forgotPassword';
        return axiosClient.put(url, { email, password });
    }
    ///Google
}

export default userApi;

