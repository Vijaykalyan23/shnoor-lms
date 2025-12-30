import React, { useRef, useState } from 'react';
import '../Dashboard.css';

const QuestionBank = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      console.log("File selected:", file.name);
      alert(`File "${file.name}" selected for upload.`);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        
        <h3 className="form-header">Upload Question Banks Only</h3>
        <p style={{ margin: '0 0 25px 0', fontSize: '0.9rem', color: '#6b7280' }}>
          Upload and manage exam questions here.
        </p>
        
        <div 
          className="drag-drop-area"
          onClick={handleBrowseClick}
        >
          <p style={{ fontSize: '1rem', color: '#4b5563', marginBottom: '15px' }}>
            Drag and drop CSV/Excel files here to upload questions
          </p>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleBrowseClick();
            }}
            className="btn-primary"
          >
            Browse Files
          </button>

          {fileName && (
            <div style={{ marginTop: '20px', padding: '10px', background: '#dcfce7', color: '#166534', borderRadius: '6px', display: 'inline-block', fontSize: '0.9rem', fontWeight: '500' }}>
              ✓ Selected: {fileName}
            </div>
          )}

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
            accept=".csv, .xlsx, .xls"
          />
        </div>

      </div>
    </div>
  );
};

export default QuestionBank;