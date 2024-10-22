import axios from "axios";

class User {
  
    static async reload() {
        try {
            const res = await axios.get('http://localhost:5000/auth/getdetails', { withCredentials: true });
            if (res.status === 200) {
                console.log(res.data.username);
                sessionStorage.setItem('username', res.data.username);
                sessionStorage.setItem('role', res.data.role);
                sessionStorage.setItem('employee_id', res.data.employee_id);
                return res.data.username;
            } else {
                throw new Error('Error in getting user details');
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error in reload');
        }
    }

    static async login(username, password) {
        try {
            const res = await axios.post('http://localhost:5000/auth/login', {
                username,
                password
            }, { withCredentials: true });
            if (res.status === 200) {
                sessionStorage.setItem('isLoggedIn', 'true');
                await User.reload();
            } else {
                throw new Error('Login failed: unexpected status code');
            }
        } catch (error) {
            console.error(error);
            throw new Error('Login error');
        }
    }

    static async getUsername() {
        if (sessionStorage.getItem('username') !== null) {
            return sessionStorage.getItem('username');
        } else {
            await User.reload();
            console.log(sessionStorage.getItem('username'));
            return await User.getUsername();
        }
    }

    static async getRole() {
        if (sessionStorage.getItem('role') !== null) {
            return sessionStorage.getItem('role');
        } else {
            await User.reload();
            return await User.getRole();
        }
    }

    static async getEmployeeId() {
        if (sessionStorage.getItem('employee_id') !== null) {
            return sessionStorage.getItem('employee_id');
        } else {
            await User.reload();
            return await User.getEmployeeId();
        }
    }

    static isLoggedin() {
        return sessionStorage.getItem('isLoggedIn') === 'true';
    }

    static async logout() {
        try {
            sessionStorage.clear();
            document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
}

export default User;
