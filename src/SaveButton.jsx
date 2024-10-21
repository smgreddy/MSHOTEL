import React, { useState } from "react";

const SaveButton = ({ data, url }) => {
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    alert('Hello1:= '+url)

    setStatus("Saving...");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Use the `data` prop passed in as the payload
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Data saved successfully!");
        alert("Data saved successfully with ID: " + result.id);
      } else {
        setStatus("Failed to save data.");
        alert("Error saving data: " + result.message);
      }
    } catch (error) {
      setStatus("Error during saving.");
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SaveButton;
