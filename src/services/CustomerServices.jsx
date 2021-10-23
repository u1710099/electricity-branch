import axios from 'axios';
const Customer_API_BASE_URL = "http://localhost:8081/api/account";

class CustomerServices {
    getCustomerById(custId) {
        return axios.get(Customer_API_BASE_URL + '/' + custId);
    }

    getCurrentCostumer() {
        return axios.get(Customer_API_BASE_URL, {headers:{'Authorization' : 'Bearer ' + localStorage.getItem("token")}});
    }

    updateCustomerProfile(customer) {
        return axios.put(Customer_API_BASE_URL + '/', customer);
    }

    addMoreDetails(customer, id) {
        return axios.put(Customer_API_BASE_URL + '/addMore/' + id, customer);
    }

    getAllCustomer(){
        return axios.get(Customer_API_BASE_URL+'/');
    }

}
export default new CustomerServices();