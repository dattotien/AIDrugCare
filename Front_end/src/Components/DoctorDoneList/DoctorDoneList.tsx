import DoctorDoneListCard from "./DoctorDoneListCard";
import {useState, useEffect} from "react";
import axios from "axios";

export interface Visit {
    age : string,
    dob: string,
    diagnosis: string,
    patient_id: number,
    visit_date: string
}
export default function DoctorDoneList(){
    const [visits, setVisits] = useState<Visit[]>([])
    const doctorId = localStorage.getItem("doctorId");
    const API_URL = import.meta.env.VITE_API_URL;
    useEffect (() => {
        const fetchVisit = async () => {
            if (!doctorId) return;
            try {
                const res = await axios.get(`${API_URL}/previous-patients/${doctorId}`)
                setVisits(res.data.data);
                console.log(res.data.data);
            }catch (error){
                console.log("error");
            }
        };
        fetchVisit();
    }, [doctorId])
    return (
        <div style={{ width: "100%", height: "40%", borderRadius: "10px" }}>
            <div style = {{display : "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <p style = {{fontSize : "12px", fontWeight: "bold", color : "#000", margin: 0,  marginTop: 20, marginLeft: 18 , marginBottom: 7}}>Danh sách đã khám</p>
                <p style = {{fontSize : "12px", color: "#737373", margin: 0, marginTop: 20, marginRight: 25 , marginBottom: 7}}>Xem tất cả</p>
            </div>

            <div>
                {visits.length > 0 ? (
                    visits.map((visit: Visit, idx) => (
                        <DoctorDoneListCard
                            key={idx}
                            highlight={idx % 2 === 0 ? "#043bb3" : "#d12326"}
                            visit = {visit}
                        />
                      ))
                ) : (
                    <p style={{ marginLeft: "20px", color: "gray" }}>Chưa có dữ liệu</p>
                )}
            </div>
        </div>
    );
}