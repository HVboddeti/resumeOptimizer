import React from "react";

function ResumeUpload({ setResume }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <h3>Upload Resume (PDF/DOCX)</h3>
            <input type="file" accept=".pdf,.docx" onChange={(e) => setResume(e.target.files[0])} />
        </div>
    );
}

export default ResumeUpload;
