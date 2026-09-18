import { useEffect, useState } from "react";
import socket from "./services/socket";

function App() {

  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {

    console.log("Connecting to Node.js...");

    socket.on("connect", () => {
      console.log("Connected to Node.js:", socket.id);
    });

    socket.on("sensorData", (data) => {
      console.log("Received sensor data:", data);
      setSensorData(data);
    });

    return () => {
      socket.off("connect");
      socket.off("sensorData");
    };

  }, []);

  return (
    <div style={{ padding: "40px" }}>

      <h1>IoT Energy Monitoring System</h1>

      <hr />

      {!sensorData ? (
        <h2>Waiting for ESP32 data...</h2>
      ) : (
        <div>

          <h2>Voltage: {sensorData.voltage} V</h2>

          <h2>Current: {sensorData.current} A</h2>

          <h2>Power: {sensorData.power} W</h2>

          <h2>Energy: {sensorData.energy} kWh</h2>

          <h2>Cost: ₹{sensorData.cost}</h2>

        </div>
      )}

    </div>
  );
}

export default App;