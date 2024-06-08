import axios from "axios"

class LocationControler {
    async getAllLocation() {
        try {
            const respo = await axios.get("https://666251e462966e20ef0838b9.mockapi.io/api/location/location");
            return respo.data;
        } catch (e) {
            console.error(e);
        }
    }
}
export default new LocationControler();