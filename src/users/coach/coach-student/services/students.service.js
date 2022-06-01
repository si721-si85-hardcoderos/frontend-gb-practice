import http from "../../../../core/services/http-common.js"
export class StudentsService {
    endPoint='/students';

    confirmCredentials(username, password){
        return http.get(`${this.endPoint}/?email=${username}&password=${password}`)
    }

    getByUsername(username){
        return http.get(`${this.endPoint}/?email=${username}`)
    }

    getAll() {
        return http.get(`${this.endPoint}`);

    }
     getById(id){
        return http.get(`${this.endPoint }/?id=${id}`);
    } 
    create(CreateTutorialDto) {
        return http.post(this.endPoint,CreateTutorialDto)
    }

    delete(id) {
        return http.delete(`${this.endPoint }/${id}`);
    }

    update(id,updateTutorialDto) {
        return http.put(`${this.endPoint }/${id}`,updateTutorialDto);
    
    }
}

export default new StudentsService();