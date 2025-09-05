import DoctorCardCount from "./DoctorCardCount";
import DoctorDoneListCard from "./DoctorDoneListCard";
import DoctorEventListCard from "./DoctorEventListCard";
import DoctorNews from "./DoctorNews";
import DoctorWaitingList from "./DoctorWaitingList";
import DoctorSchedule from "./DoctorSchedule";

export default function DoctorDashboard() {
    return (
        <div style = {{
            width : "1045px",
            height: "570px",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 0
        }}>
            <div style = {{
                width: "660px",
                height: "570px",
                backgroundColor: "transparent",
            }}>
                <DoctorCardCount/>
                <DoctorWaitingList></DoctorWaitingList>
                <DoctorNews/>
            </div>
        
            <div style = {{
                width: "340px",
                height: "570px",
                backgroundColor: "rgb(255,255,255,0.7)",
                borderRadius: "10PX"
            }}>
                <DoctorSchedule></DoctorSchedule>
                <div style = {{display : "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <p style = {{fontSize : "12px", fontWeight: "bold", color : "#000", margin: 0,  marginTop: 20, marginLeft: 18 , marginBottom: 7}}>Danh sách đã khám</p>
                    <p style = {{fontSize : "12px", color: "#737373", margin: 0, marginTop: 20, marginRight: 25 , marginBottom: 7}}>Xem tất cả</p>
                </div>
                    <DoctorDoneListCard highlight="#043bb3"></DoctorDoneListCard>
                    <DoctorDoneListCard highlight="#d12362"></DoctorDoneListCard>
                    <DoctorDoneListCard highlight="#043bb3"></DoctorDoneListCard>

                <div style = {{display : "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <p style = {{fontSize : "12px", fontWeight: "bold", color : "#000", margin: 0 ,  marginTop: 12, marginLeft: 18 , marginBottom: 7}}>Sự kiện</p>
                    <p style = {{fontSize : "12px", color: "#737373", margin: 0, marginTop: 12, marginRight: 25 , marginBottom: 7}}>Xem tất cả</p>
                </div>                    
                    <DoctorEventListCard highlight="#043bb3"></DoctorEventListCard>
                    <DoctorEventListCard highlight="#d12362"></DoctorEventListCard>
            </div>
        
        

        </div>
    );
}