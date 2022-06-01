import http from "../../../../core/services/http-common.js"
export class EventsService {
    endPoint='/events';

    getAll() {
        return http.get(`${this.endPoint}`);

    }
    getById(id){
        return http.get(`${this.endPoint}/?id=${id}`);
    }
    create(CreateEventDto) {
        return http.post(this.endPoint,CreateEventDto)
    }

    delete(id) {
        return http.delete(`${this.endPoint}/${id}`);
    }

    update(id,updateEventDto) {
        return http.put(`${this.endPoint}/${id}`,updateEventDto);

    }
}

export default new EventsService();