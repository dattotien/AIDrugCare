import  { useState, useEffect } from "react";
import {Form,Input,Button,message,Row,Col, Card} from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined, UserOutlined} from "@ant-design/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "./PatientProfile.css";

interface PatientInforProps {
  patient: any;
}

export default function PatientInforScene({patient}:PatientInforProps) {
  const [form] = Form.useForm();

   useEffect(() => {
    if (patient) {
      form.setFieldsValue({
        ...patient,
        dob: patient.dob ? dayjs(patient.dob).format("YYYY/MM/DD") : null,
      });
    }
  }, [patient, form]);
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar">
          <UserOutlined style={{ fontSize: "60px", color: "#ffffff", top : "100px"}} />
        </div>
        <div>
          <h2 className="header-name" style = {{position: "absolute", top : "80px", left: "175px"}}>BN: {patient.name}</h2>
          <p className="header-code" style = {{position : "absolute", top : "112px", left : "175px", color : "black", fontWeight: "bold"}}>Mã bệnh nhân: {patient._id}</p>
        </div>
      </div>

      {/* Body Form */}
      <div className="profile-body">
        <Card 
        style = {{
            width : "656px",
            height : "200px",
            backgroundColor: "rgba(255,255,255,0.7)",
            top : "50px",
            left : "-1px",
            borderRadius: 0,
        }}>
            <Form form={form} layout="horizontal"   disabled  className="custom-form" labelCol={{ span: 8}} wrapperCol={{ span: 18 }} style = {{marginTop : "-5px"}}>
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
              <Form.Item name="address" label="Quê quán">
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
                <Input/>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="bhyt_code" label="Số BHYT">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        </Card>
      </div>
    <div className="profile-footer">
            Bệnh viện đa khoa A
    </div>
    </div>
  );
}
