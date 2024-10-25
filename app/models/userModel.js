'use client';
import axios from "axios";

class User {
  
    static async login(username, password) {
        const res = await axios.post('http://localhost:5000/auth/login', {
            username,
            password
        }, { withCredentials: true });
        if (res.status != 200) {
            throw new Error('Login failed: unexpected status code');
        }
    }

    static async getUsername() { 
        try {
            const res = await axios.get('http://localhost:5000/auth/getdetails', { withCredentials: true });
            if (res.status === 200) {
                return res.data.username;
            } else {
                throw new Error('Error in getting user details');
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error in reload');
        }
    }

    static async getRole() {
        try {
            const res = await axios.get('http://localhost:5000/auth/getdetails', { withCredentials: true });
            if (res.status === 200) {
                return res.data.role;
            } else {
                throw new Error('Error in getting user details');
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error in reload');
        }
    }

    static async getEmployeeId() {
        try {
            const res = await axios.get('http://localhost:5000/auth/getdetails', { withCredentials: true });
            if (res.status === 200) {
                return res.data.employee_id;
            } else {
                throw new Error('Error in getting user details');
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error in reload');
        }
    }

    static  async getuserProfile() {
        try{
            const res = await axios.get('http://localhost:5000/auth/getprofile', { withCredentials: true });
            if(res.status ===200){
                return res.data.userProfile;
            }
        }catch(error){
           console.error(error);
           return null
        }
    }

    static async logout() {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    static async getuserProfile() {
        try {
            const res = await axios.get('http://localhost:5000/auth/getprofile', { withCredentials: true });
            if (res.status === 200) {
                return res.data.userProfile;
            } else {
                throw new Error('Error in getting user profile');
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error in getuserProfile');
        }
    }
}

export default User;
