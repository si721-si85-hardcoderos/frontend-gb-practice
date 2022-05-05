import http from "../../../../core/services/http-common";

export class coachAdvisoryService {
  getAll() {
    return http.get("/advisoryes");
  }
  getById(id) {
    return http.get(`/advisoryes/?id=${id}`);
  }
  update(id, data) {
    return http.put(`/advisoryes/${id}`, data);
  }
}
