import http from "../../../../core/services/http-common.js"
import {TournamentsService} from "../../../coach/coach-tournament/services/tournaments.service";
export class CyberTournamentsService {
    endPoint='/cyber-tournaments';

    getAll() {
        return http.get(`${this.endPoint}`);

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

export default new CyberTournamentsService();