import http from "../../../../core/services/http-common.js"
export class CoachEventsService {
    endPoint='/events';

    getAllEvents() {
        return http.get(`${this.endPoint}`);

    }
    getEventsById(id){
        return http.get(`${this.endPoint}/?id=${id}`);
    }
    createEvents(CreateEventsDto) {
        return http.post(this.endPoint,CreateEventsDto)
    }

    deleteEvents(id) {
        return http.delete(`${this.endPoint}/${id}`);
    }

    updateEvents(id,updateEventsDto) {
        return http.put(`${this.endPoint}/${id}`,updateEventsDto);

    }
}

export default new CoachEventsService();