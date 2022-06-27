import http from "../../../../core/services/http-common.js"
export class AdvisoriesService {
    endPoint='/advisories';

    getAll() {
        return http.get(`${this.endPoint}`);

    }
    getByStudentId(id){
        return http.get(`${this.endPoint}/?student.id=${id}`);
    }
    getByCoachId(id){
        return http.get(`${this.endPoint}/?coachId=${id}`);
    }
     getById(id){
        return http.get(`${this.endPoint}/?id=${id}`);
    } 
    create(CreateTutorialDto) {
        return http.post(this.endPoint,CreateTutorialDto)
    }

    delete(id) {
        return http.delete(`${this.endPoint}/${id}`);
    }

    update(id,updateTutorialDto) {
        return http.put(`${this.endPoint}/${id}`,updateTutorialDto);
    
    }
}

export default new AdvisoriesService();