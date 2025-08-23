import { Button, Card, Checkbox, Input } from "antd";

export default function DoctorLoginScence() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#043BB3",
        minWidth: "100vw",
      }}
    >
      <Card>
        <h1>Đăng nhập như bác sĩ</h1>
        <p>Tên đăng nhập</p>
        <Input></Input>
        <p>Mật khẩu</p>
        <Input.Password></Input.Password>
        <div>
          <Checkbox>Ghi nhớ đăng nhập</Checkbox>
        </div>
        <Button>Đăng nhập</Button>
      </Card>
    </div>
  );
}
