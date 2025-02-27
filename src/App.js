import React, { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import JobDescriptionInput from "./components/JobDescriptionInput";
import ResultDisplay from "./components/ResultDisplay";

function App() {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [enhancedResumeUrl, setEnhancedResumeUrl] = useState("");

    const handleUpload = async () => {
        if (!resume || !jobDescription) {
            alert("Please upload a resume and enter a job description.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("job_description", jobDescription);

        try {
            const response = await fetch("https://fydmifnj79.execute-api.us-east-1.amazonaws.com", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            setEnhancedResumeUrl(data.enhanced_resume_url);
        } catch (error) {
            console.error("Error uploading resume:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Resume Optimizer</h1>
            <ResumeUpload setResume={setResume} />
            <JobDescriptionInput setJobDescription={setJobDescription} />
            <button onClick={handleUpload} style={{ marginTop: "20px", padding: "10px 20px" }}>
                Optimize Resume
            </button>
            <ResultDisplay enhancedResumeUrl={enhancedResumeUrl} />
        </div>
    );
}

export default App;
