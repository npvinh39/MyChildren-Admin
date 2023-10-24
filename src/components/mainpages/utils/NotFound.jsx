import { Button, Result } from 'antd';
// go back to previous page
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title="404"
            subTitle="Hmmm. Trang bạn truy cập hiện không tồn tại."
            extra={<Button type="primary" onClick={() => navigate(-1)}>Quay lại</Button>}
        />
    );
};

export default NotFound;