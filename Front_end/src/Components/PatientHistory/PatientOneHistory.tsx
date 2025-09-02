import {useState} from "react";
import dayjs from "dayjs";
import {Table, Button} from "antd";
import "./PatientHistory.css";
import logo from "../../assets/AIDrugCare.png";
import more from "../../assets/more (2).png";

export default function PatientOneHistory(){

    const columns = [
        { title: "ID Thuốc", dataIndex: "drugid", key: "drugid", width: 150 },
        { title: "Tên thuốc", dataIndex: "drugname", key: "drugname", width: 200 },
        { title: "Liều dùng", dataIndex: "pre", key: "pre", width: 200 },
        { title: "Thời gian", dataIndex: "time", key: "time", width: 150 },
        { title: "Yêu cầu", dataIndex: "more", key: "more", width: 200 },
    ];

    const data = [
        { drugid: "DB100002", drugname: "Aspirin", pre: "2 lần / 1 ngày", time: "Sáng / tối", more: "Không có" },
        { drugid: "DB100003", drugname: "Paracetamol", pre: "3 lần / 1 ngày", time: "Sáng / trưa / tối", more: "Uống sau ăn" },
        { drugid: "DB100004", drugname: "Omeprazole", pre: "1 lần / 1 ngày", time: "Sáng", more: "Trước ăn sáng" },
        { drugid: "DB100005", drugname: "Vitamin C", pre: "1 lần / 1 ngày", time: "Tối", more: "Không có" },
        { drugid: "DB100006", drugname: "Amoxicillin", pre: "2 lần / 1 ngày", time: "Sáng / tối", more: "Đủ liều" },
    ];

    const [patient] = useState({
        code : "1002",
        email : "namnguyen@gmail.com",
        name : "Nguyen Xuan Nam",
        gender : "Nam",
        hometown: "Hai Duong",
        dob: dayjs("1978-08-30", "YYYY-MM-DD"),
        phone: "0978349285",
        cccd: "03030303008523",
        bhyt: "QH3412672H1",
    });

    const [history] = useState({
        result : "Mô tả hình ảnh : ví dụ như thận bình thường, dạ dày có vết loét khoảng 0.3 cm bên gcos trái.",
        diagnosis: "Bệnh nhân bị viêm dạ dày cấp tính",
        note: "Ngủ nghỉ đúng giờ, ăn nhiều chất sơ",
        code_pre: "ABCD1002"
    });

    const [showActions, setShowActions] = useState(false);
    const [open, setOpen] = useState(false);
    const handlePrint = () => {
        console.log("print")
    };

    const handleSend = () => {
        console.log("select")
    };


    return (
        <div style ={{
            width: "78vw",  
            minHeight: "100vh",
            backgroundColor: "rgba(255,255,255,0.8)",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px"
        }}>
            <div style = {{ textAlign : "center"}}>
                <p  style = {{marginTop : 10, fontWeight: "bold", fontSize : "16px"}}>BỆNH VIỆN ĐA KHOA A - CƠ SỞ - B</p>
                <p style = {{marginTop: -10, fontSize : "12px"}}>Email: ngyen23102005@gmail.com</p>
                <p style = {{marginTop : -10, fontSize : "12px"}}>Hotline: 0978349285/0986269837</p>
            </div>
            <div style = {{ marginLeft : 685, marginTop: "5px"}}>
                <p>Hà Nội, ngày 28 tháng 8 năm 2025</p>
            </div>
            <div style = {{margin : "10px 0", textAlign : "center"}}>
                <p style = {{margin : 0, fontWeight: "bold", fontSize : "16px"}}>KÊ ĐƠN KHÁM BỆNH</p>
            </div>  

            <div style={{ 
                marginTop: "10px",
                display : "flex", 
                flexDirection: "row", 
                justifyContent: "space-between",
                width: "90%",
            }}>
                <p><strong>Họ và tên:</strong> <span style={{ marginLeft: "10px" }}>{patient.name}</span></p>
                <p><strong>Giới tính:</strong> <span style={{ marginLeft: "10px" }}>{patient.gender}</span></p>
                <p><strong>Số điện thoại:</strong> <span style={{ marginLeft: "10px" }}>{patient.phone}</span></p>
            </div>

            <div style={{ 
                marginTop: "-20px",
                display : "flex", 
                flexDirection: "row", 
                justifyContent: "space-between",
                width: "90%",
            }}>
                <p><strong>Ngày sinh:</strong> <span style={{ marginLeft: "10px" }}>{dayjs(patient.dob).format("DD/MM/YYYY")}</span></p>
                <p><strong>CCCD:</strong> <span style={{ marginLeft: "10px" }}>{patient.cccd}</span></p>
            </div>

            <div style={{ marginTop: "-20px", width: "90%" }}>
                <p><strong>Kiết quả thăm khám:</strong> <span style={{ marginLeft: "10px" }}>{history.result}</span></p>
            </div>

            <div style={{ marginTop: "5px", width: "90%" }}>
                <p><strong>Chẩn đoán:</strong> <span style={{ marginLeft: "10px" }}>{history.diagnosis}</span></p>
            </div>

            <div style={{ marginTop: "5px", width: "90%" }}>
                <p><strong>Ghi chú:</strong> <span style={{ marginLeft: "10px" }}>{history.note}</span></p>
            </div>

            <div style={{
                display : "flex", 
                flexDirection: "row", 
                justifyContent: "space-between",
                width: "90%",
                marginTop: "-20px"
            }}>
                <p><strong>Chi tiết đơn thuốc:</strong></p>
                <p style={{color: "#043bb3"}}>
                    <strong>Mã đơn thuốc:</strong>
                    <span style={{ marginLeft: "10px" }}>{history.code_pre}</span>
                </p>
            </div>

            <div style={{ marginTop: "-10px", width: "90%" }}>
                <Table className="custom-row"
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
                    rowKey="drugid"
                    rowClassName={(_, index) =>
                        index % 2 === 0 ? "row-even" : "row-odd"
                    }
                />
            </div>

            {!showActions ? (
            <div
                className="footer-button"
                style={{
                    marginTop: "30px",
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <Button
                    className = "more"
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={() => setShowActions(true)}
                    style={{ padding: "0 22px", backgroundColor: "#043bb3", borderRadius: "20" }}>
                    <img src = {more} alt = "more" style={{width: "12px", height : "15px"}}></img>
                </Button>
            </div>
            ) : (
                <div
                    className="footer-button"
                    style={{
                    marginTop: "30px",
                    textAlign: "center",
                    width: "100%",
                    }}>
                    <div
                        style={{
                            display: "inline-flex",
                            gap: 8,
                            alignItems: "center",
                            background: "#000",
                            color: "#fff",
                            borderRadius: 30,
                            padding: "8px 12px",
                            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                        }}>
                            <Button  className = "print" onClick={handlePrint} style={{ borderRadius: 20, backgroundColor: "#d12326", color: "#ffffff", borderColor: "transparent"}}>
                                Print
                            </Button>
                            <Button  className = "send" onClick={handleSend} style={{ borderRadius: 20, backgroundColor: "#737373", color: "#ffffff", borderColor: "transparent"}}>
                                Send
                            </Button>
                            <Button
                            className="close"
                                type="text"
                                onClick={() => setShowActions(false)}
                                style={{
                                     width: 30,
                                    height: 30,
                                     borderRadius: "50%",
                                    color: "#fff",
                                }}>
                            X
                            </Button>
                        </div>
                    </div>
                )}
        </div>
    );
}
