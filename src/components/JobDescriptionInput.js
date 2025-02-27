import React from "react";

function JobDescriptionInput({ setJobDescription }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <h3>Paste Job Description</h3>
            <textarea 
                rows="6" 
                cols="50" 
                placeholder="Paste the job description here..." 
                onChange={(e) => setJobDescription(e.target.value)}
            />
        </div>
    );
}

export default JobDescriptionInput;
