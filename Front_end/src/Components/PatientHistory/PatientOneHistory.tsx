import {useState, useEffect} from "react";
import dayjs from "dayjs";
import {Table, Button} from "antd";
import "./PatientHistory.css";
import logo from "../../assets/AIDrugCare.png";
import more from "../../assets/more (2).png";
import axios from "axios";

interface Props {
    visitId : string | null;
}

export default function PatientOneHistory({visitId} : Props){
    const [patient, setPatient] = useState<any>(null);
    const [visit, setVisit] = useState<any>(null);
    const [pres, setPres] = useState<any>(null);
    const [history, setHistory] = useState<any>(null);

  useEffect(() => {
    const fetchPre = async () => {
      if (!visitId) return;
      try {
        const res = await axios.get(`http://127.0.0.1:8000/prescription/${visitId}`);
        if (res.data.success) {
          setPatient(res.data.data.patient);
          setVisit(res.data.data.visit);
          setPres(res.data.data.prescription);
          setHistory(res.data.data.medical_history);
        }
      } catch (error) {
        console.error("Lỗi fetch:", error);
      }
    };

    fetchPre();
  }, [visitId]);

  const columns  = [
    {
        title: "ID",
        dataIndex: "drug_id",
        key: "drug_id",

    },
    {
        title: "Tên thuốc",
        dataIndex : "drug_name",
        key: "drug_name",
    },
    {
        title: "Liều dùng",
        dataIndex: "frequency",
        key : "frequency",
    },
    {
        title: "Thời gian",
        dataIndex: "time",
        key: "time",
    },
    {
        title: "Yêu cầu",
        dataIndex: "requirement",
        key: "requirement",
    }
  ]
    const [showActions, setShowActions] = useState(false);
    useEffect(() => {
        const fetchPrescription = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/prescription/${visitId}`);
            const data = res.data.data; 
            setPatient(data.patient);
            setVisit(data.visit);
            setHistory(data.medical_history);
            setPres(data.prescription);
        } catch (error) {
            console.error("Lỗi khi fetch prescription:", error);
        }
        };
        fetchPrescription();
    }, [visitId]);

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
                <p  style = {{marginTop : 10, fontWeight: "bold", fontSize : "16px"}}>BỆNH VIỆN ĐA KHOA A</p>
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
                <p><strong>Họ và tên:</strong> <span style={{ marginLeft: "10px" }}>{patient?.name}</span></p>
                <p><strong>Giới tính:</strong> <span style={{ marginLeft: "10px" }}>{patient?.gender}</span></p>
                <p><strong>Số điện thoại:</strong> <span style={{ marginLeft: "10px" }}>{patient?.phone}</span></p>
            </div>

            <div style={{ 
                marginTop: "-20px",
                display : "flex", 
                flexDirection: "row", 
                justifyContent: "space-between",
                width: "90%",
            }}>
                <p><strong>Ngày sinh:</strong> <span style={{ marginLeft: "10px" }}>{dayjs(patient?.dob).format("YYYY/MM/DD")}</span></p>
                <p><strong>CCCD:</strong> <span style={{ marginLeft: "10px" }}>{patient?.cccd}</span></p>
            </div>

            <div style={{ marginTop: "-20px", width: "90%" }}>
                <p><strong>Kết quả thăm khám:</strong> <span style={{ marginLeft: "10px" }}>{history?.labResult}</span></p>
            </div>

            <div style={{ marginTop: "5px", width: "90%" }}>
                <p><strong>Chẩn đoán:</strong> <span style={{ marginLeft: "10px" }}>{visit?.diagnosis}</span></p>
            </div>

            <div style={{ marginTop: "5px", width: "90%" }}>
                <p><strong>Ghi chú:</strong> <span style={{ marginLeft: "10px" }}>{visit?.note}</span></p>
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
<<<<<<< Updated upstream
                    <span style={{ marginLeft: "10px" }}>{pres?.id}</span>
=======
                    <span style={{ marginLeft: "10px" }}>{prescription.id}</span>
>>>>>>> Stashed changes
                </p>
            </div>

            <div style={{ marginTop: "-10px", width: "90%" }}>
                <Table className="custom-row"
                    columns={columns}
<<<<<<< Updated upstream
                    dataSource={pres?.items}
=======
                    dataSource={prescription}
>>>>>>> Stashed changes
                    pagination={false}
                    bordered
                    rowKey="drug_id"
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
