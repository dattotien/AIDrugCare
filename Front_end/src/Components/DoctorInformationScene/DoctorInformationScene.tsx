import  { useState, useEffect } from "react";
import {Form,Input,Button,message,Row,Col, Card} from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined, UserOutlined} from "@ant-design/icons";
import { DatePicker } from "antd";
import "./DoctorInformationScene.css";

interface DoctorInforProps {
  doctor: any;
  onSave : (updateDoctor : any ) => void;
  onClose : () =>void;
}

export default function DoctorInforScene({doctor, onSave, onClose} : DoctorInforProps) {
  
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    form.setFieldsValue(doctor);
  }, [doctor, form]);

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave({...doctor, ...values})
      setEditing(false);
      form.setFieldsValue(values);
      message.success("Cập nhật thành công!");
    } catch (error) {
      message.error("Lỗi cập nhật thông tin");
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(doctor);
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar">
          <UserOutlined style={{ fontSize: "60px", color: "#ffffff", top : "100px"}} />
        </div>
        <div>
          <h2 className="header-name" style = {{position: "absolute", top : "80px", left: "185px"}}>BS: {doctor.name}</h2>
          <p className="header-code" style = {{position : "absolute", top : "113px", left : "185px", color : "black", fontWeight: "bold"}}>{doctor.title} : {doctor.specialty}</p>
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
      <div style = {{backgroundColor : "#ffffff", margin: 0, width: "840px", height: "50px"}}></div>

      {/* Body Form */}
      <div className="profile-body">
        <Card 
        style = {{
            width : "843px",
            height : "290px",
            backgroundColor: "#ffffff",
            top : "15px",
            left : "-1px",
            borderRadius: 0,
        }}>
            <Form form={form} layout="horizontal" disabled={!editing} className="custom-form" labelCol={{ span: 8}} wrapperCol={{ span: 18 }} style = {{marginTop : "-5px"}}>
          <Row gutter={5}>
            <Col span={10}>
              <Form.Item name="_id" label="ID">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="password" label="Mật khẩu">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="workplace" label="Bệnh viện">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="created_at" label="Ngày tạo">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="phone" label="SĐT">
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
                top: "-130px",
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
            {doctor.workplace}
    </div>
    </div>
  );
}
