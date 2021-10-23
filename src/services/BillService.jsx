import axios from 'axios';
const Bill_API_BASE_URL = "http://localhost:8081/springfox/api/billDetails";

class CustomerServices {
    getBillById(billId) {
        return axios.get(Bill_API_BASE_URL + '/' + billId);
    }

    getAllBill() {
        return axios.get(Bill_API_BASE_URL + '/');
    }

    deleteBill(billId) {
        return axios.delete(Bill_API_BASE_URL + '/' + billId);
    }

    updateBill(bill) {
        return axios.put(Bill_API_BASE_URL + '/', bill);
    }

    addBill(bill) {
        return axios.post(Bill_API_BASE_URL + '/add' + bill);
    }
    getBillDetails(email) {
        return axios.get(Bill_API_BASE_URL + '/customer/' + email);
    }

}
export default new CustomerServices();