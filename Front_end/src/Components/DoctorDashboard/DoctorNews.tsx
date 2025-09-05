import "./DoctorDashboard.css";
import pic from "../../assets/newBack.jpg";
import even from "../../assets/event.png";
import edit from "../../assets/edit (2).png";
import search from "../../assets/loupe.png";
import pic0 from "../../assets/pic0.jpg";
import pic2 from "../../assets/pic2.jpg";
import pic3 from "../../assets/pic3.jpg";



export default function DoctorNews() {
    return (
        <div style = {{width: "660px", height: "230px", display: "flex", justifyContent: "space-between", backgroundColor: "transparent", margin: 0, marginTop: -25}}>
            <div style = {{width: "260px", height: "230px", backgroundColor: "rgb(255,255,255,0.7)", borderRadius: "10px", display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center"}}>
                <p style = {{fontSize: "16px", color: "#000000", margin: 0, fontWeight: "bold", marginLeft: -150}}>TIN TỨC</p>
                <img src = {pic} alt = "pic" style = {{width: "220px", height: "120px", borderRadius: "10px", marginTop: 20}}></img>
                <p style = {{fontSize: "12px", fontWeight: "bold", color: "#000000", marginLeft: 12, marginRight: 15, textAlign: "center", marginTop: 2}}>Thông tin về kế hoạch nâng cao kiểm thử cho hệ thống y tế cơ sở 4</p>
                <div style = {{display : "flex", flexDirection: "row", marginLeft: 0, marginRight: 0}}>
                    <img src = {even} alt = "time" style = {{width: "15px", height: "15px", marginLeft: -1, marginTop: -3}}></img>
                    <p style = {{fontSize: "12px", color: "#737373", margin: 0, marginLeft: 3, marginTop: -4}}>28/8/2025</p>
                    <img src = {edit} alt = "edit" style = {{width: "15px", height: "15px",  marginLeft: 80, marginTop: -4}}></img>
                    <p style = {{fontSize: "12px", color: "#737373", margin: 0, marginLeft: 3, marginTop: -4}}>T.Jones</p>
                </div>
            </div>

            <div style = {{width: "350px", height: "230px", backgroundColor: "rgb(255,255,255,0.7)", borderRadius: "10px", display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
                <p style = {{fontSize: "16px", color: "#000000", margin: 0, fontWeight: "bold", marginLeft: -240}}>TÌM KIẾM</p>
                <div style = {{width: "330px", height: "25px", backgroundColor: "white", borderRadius: "8px", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 18}}>
                    <p style = {{fontSize: "12px", color : "#d9d9d9", margin: 0, marginLeft: 5, marginTop: 2}}>Tìm kiếm tại đây</p>
                    <img src = {search} alt = "search" style = {{width: "15px", height: "15px", margin: 0, marginTop: 4, marginRight: 4}}>
                    </img>
                </div>
                <div className = "news-scroll" style = {{width: "330px", height: "100vh", backgroundColor: "rgb(255,255,255,0.7)", borderRadius: "10px", marginTop: 20 , overflowY: "auto"}}>
                    <div style ={{ width: "305px", height: "40px", backgroundColor: "#fff",display: "flex", flexDirection: "row", borderRadius: "10px", marginLeft: 8, marginTop: 8 }}>
                        <img src= {pic} alt = "new" style = {{width: "40px", height: "30px", borderRadius: "5px", marginTop: 5, marginLeft: 5}}></img>
                        <p style = {{fontWeight: "bold", fontSize: "12px", color: "#737373", margin: 0, marginLeft: 10, marginTop: 1}}>Thông tin về kế hoạch nâng cao kiểm thử cho hệ thống y tế cơ sở 4</p>
                        <img src = {edit} alt = "edit" style = {{width : "12px", height: "12px", marginTop: 23}}></img>
                    </div>

                    <div style ={{ width: "305px", height: "40px", backgroundColor: "#fff",display: "flex", flexDirection: "row", borderRadius: "10px", marginLeft: 8, marginTop: 8 }}>
                        <img src= {pic0} alt = "new0" style = {{width: "40px", height: "30px", borderRadius: "5px", marginTop: 5, marginLeft: 5}}></img>
                        <p style = {{fontWeight: "bold", fontSize: "12px", color: "#737373", margin: 0, marginLeft: 10, marginTop: 1}}>Xây dựng thêm trụ sở tại thành phố mới tại Hà Nội</p>
                        <img src = {edit} alt = "edit" style = {{width : "12px", height: "12px", marginTop: 23}}></img>
                    </div>

                    <div style ={{ width: "305px", height: "40px", backgroundColor: "#fff",display: "flex", flexDirection: "row", borderRadius: "10px", marginLeft: 8, marginTop: 8 }}>
                        <img src= {pic2} alt = "new2" style = {{width: "65px", height: "30px", borderRadius: "5px", marginTop: 5, marginLeft: 5}}></img>
                        <p style = {{fontWeight: "bold", fontSize: "12px", color: "#737373", margin: 0, marginLeft: 10, marginTop: 1}}>Thông tin về kế hoạch nâng cao kiểm thử cho hệ thống y tế cơ sở 2</p>
                        <img src = {edit} alt = "edit" style = {{width : "12px", height: "12px", marginTop: 23}}></img>
                    </div>

                    <div style ={{ width: "305px", height: "40px", backgroundColor: "#fff",display: "flex", flexDirection: "row", borderRadius: "10px", marginLeft: 8, marginTop: 8 }}>
                        <img src= {pic3} alt = "new3" style = {{width: "50px", height: "30px", borderRadius: "5px", marginTop: 5, marginLeft: 5}}></img>
                        <p style = {{fontWeight: "bold", fontSize: "12px", color: "#737373", margin: 0, marginLeft: 10, marginTop: 1}}>Trụ sở 3 - thông báo mới về điều động đội ngũ y bác sĩ</p>
                        <img src = {edit} alt = "edit" style = {{width : "12px", height: "12px", marginTop: 23}}></img>
                    </div>
                </div>
            </div>
        </div>
    );
}