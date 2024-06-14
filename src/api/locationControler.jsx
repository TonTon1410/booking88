import axios from "axios"

//https://666251e462966e20ef0838b9.mockapi.io/api/location/location
class LocationControler {
    async getAllLocation() {
        try {
            const respo = await axios.get("http://localhost:5002/locations");
            return respo.data;
        } catch (e) {
            console.error(e);
        }
    }

    async getOneLocation(id) {
        try {
            const respo = await axios.get(`http://localhost:5002/locations/${id}`);
            return respo.data;
        } catch (e) {
            console.error(e);
        }
    }

    //https://666251e462966e20ef0838b9.mockapi.io/api/location/locationDetail
    // getLocationID = async (value)=>{
    //     try{
    //         const location = await this.getOneLocation(value);
    //         if(location){
    //             const locationDetail = await this.getLocationDetail(location.locationID);
    //             if(locationDetail && locationDetail.locationID === location.locationID){
    //                 const combined = {...location, ...locationDetail};
    //                 return combined;
    //             }
    //         }
    //     }catch (e) {
    //         console.error(e);
    //     }
    // }
}
export default new LocationControler();