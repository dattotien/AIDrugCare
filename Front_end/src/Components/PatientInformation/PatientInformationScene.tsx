import  { useState, useEffect } from "react";
import {Form,Input,Button,message,Row,Col, Card} from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined, UserOutlined} from "@ant-design/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "./PatientProfile.css";

interface PatientInforProps {
  patient: any;
  onSave : (updatePatient : any ) => void;
  onClose : () =>void;
}

export default function PatientInforScene({patient, onSave, onClose}:PatientInforProps) {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    form.setFieldsValue(patient);
  }, [patient, form]);

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave({...parent, ...values})
      setEditing(false);
      form.setFieldsValue(values);
      message.success("Cập nhật thành công!");
    } catch (error) {
      message.error("Lỗi cập nhật thông tin");
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(patient);
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar">
          <UserOutlined style={{ fontSize: "60px", color: "#043bb3", top : "100px"}} />
        </div>
        <div>
          <h2 className="header-name" style = {{position: "absolute", top : "80px", left: "175px"}}>BN: {patient.name}</h2>
          <p className="header-code" style = {{position : "absolute", top : "112px", left : "175px", color : "black", fontWeight: "bold"}}>Mã bệnh nhân: {patient.code}</p>
        </div>
        {!editing && (
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="edit-btn"
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
      </div>

      {/* Body Form */}
      <div className="profile-body">
        <Card 
        style = {{
            width : "656px",
            height : "200px",
            backgroundColor: "rgba(255,255,255,0.7)",
            top : "45px",
            left : "-1px",
            borderRadius: 0,
        }}>
            <Form form={form} layout="horizontal" disabled={!editing} className="custom-form" labelCol={{ span: 8}} wrapperCol={{ span: 18 }} style = {{marginTop : "-5px"}}>
          <Row gutter={5}>
            <Col span={10}>
              <Form.Item name="name" label="Họ và tên">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="phone" label="SĐT">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="gender" label="Giới tính">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="hometown" label="Quê quán">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="cccd" label="CCCD">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="dob" label="Ngày sinh">
                <DatePicker format="YYYY-MM-DD"  className="datePicker"/>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="bhyt" label="Số BHYT">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        </Card>
      </div>

      {/* Action Buttons */}
      {editing && (
        <div className="profile-actions">
            <Card style = {{
                width : "200px",
                height : "43px",
                backgroundColor : "#000000",
                borderRadius : "30px",
                top : "3px",
                gap : "100px"
            }}>
                <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} style={{
                    borderRadius: "20px",
                    width : "70px", 
                    height : "26px", 
                    backgroundColor : "#737373", 
                    color : "#ffffff", 
                    fontSize : "12px" , 
                    fontWeight : "bold", 
                    top : "-16px",
                    marginRight: "5px",
                    }} className="saveBtn">
                    Save
                </Button>
                <Button danger icon={<CloseOutlined />} onClick={handleCancel} style={{
                    borderRadius : "20px", 
                    width : "70px", 
                    height : "26px", 
                    backgroundColor : "#d12326", 
                    color : "#ffffff", 
                    fontSize : "12px", 
                    fontWeight : "bold", 
                    top : "-16px",
                    marginLeft : "5px"
                    }} className="cancelBtn">
                    Cancel
                </Button>
            </Card>
        </div>
      )}
    <div className="profile-footer">
            Bệnh viện đa khoa A
    </div>
    </div>
  );
}
