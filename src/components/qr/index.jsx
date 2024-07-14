import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Modal, Button } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../../config/axios";



const QRComponent = ({ data }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <QRCode
        size={200}
        style={{ height: "50%", maxWidth: "100%", width: "100%" }}
        value={data?.toString() || ""}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scannerRef = useRef(null);
  const [data, setData] = useState();
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (result) => {
        setScanResult(result);
        setIsModalVisible(true);
        scanner.clear();
      },
      (error) => {
        console.warn(error);
      }
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  const handleOk = () => {
    setIsModalVisible(false);
    setScanResult(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setScanResult(null);
  };

  const fetch = async () => {
    try {
      const response = await api.put(`/courtSlot/${scanResult}`);
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (scanResult != null) {
      fetch();
    }
  }, [scanResult]);

  return (
    <div>
      <div id="qr-reader"></div>
      <Modal
        title="CheckIn thanh cong"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      ></Modal>
    </div>
  );
};

export { QRComponent, QRScanner };
