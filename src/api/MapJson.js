import Http from "../Http/http";

const MapJson = {
    async getMapJson(mapId) {
        return Http({
            method:"get",
            url:"/static/json/"+mapId+".json"
        })
    }
};
export default MapJson