import http from "../../../../core/services/http-common"

export class coachProfileService {
  getAll(){
    return http.get("/profiles");
  }
  getById(id) {
    return http.get(`/profiles/${id}`);
  }
  update(id, data) {
    return http.put(`/profiles/${id}`, data);
  }
}
