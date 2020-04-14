import Http from "../Http/http";

const MapJson = {
    async getMapJson(mapId) {
        return Http({
            method:"get",
            url:"/static/"+mapId+".json"
        })
    }
};
export default MapJson