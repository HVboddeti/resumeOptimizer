import React, { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import JobDescriptionInput from "./components/JobDescriptionInput";
import ResultDisplay from "./components/ResultDisplay";

function App() {
    // ✅ Define state variables
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [enhancedResumeUrl, setEnhancedResumeUrl] = useState("");
    const [loading, setLoading] = useState(false);  // ✅ Add loading state



    const handleUpload = async () => {
        if (!resume || !jobDescription) {
            alert("Please upload a resume and enter a job description.");
            return;
        }
    
        setLoading(true);  // ✅ Show loading indicator
    
        try {
            const resumeBase64 = await convertToBase64(resume);
            const payload = {
                bucket: "resumestorage-bucket",
                file_name: resume.name,
                tex_file: "main.tex",  // ✅ Ensure this field is sent
                job_description: jobDescription,
                resume_content: resumeBase64
            };
    
            console.log("📤 Sending request with payload:", payload);
    
            const response = await fetch("https://t9qpgcd3w3.execute-api.us-east-1.amazonaws.com/start/processResume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
    
            const data = await response.json();
            console.log("✅ Response received:", data);
    
            if (data.enhanced_resume_url) {
                setEnhancedResumeUrl(data.enhanced_resume_url);
            } else {
                alert("Error: " + (data.error || "Something went wrong!"));
            }
        } catch (error) {
            console.error("❌ Error uploading resume:", error);
            alert("Failed to process resume. Please try again.");
        } finally {
            setLoading(false);  // ✅ Hide loading indicator
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Resume Optimizer</h1>
            <ResumeUpload setResume={setResume} />
            <JobDescriptionInput setJobDescription={setJobDescription} />
            
            <button onClick={handleUpload} disabled={loading} style={{ marginTop: "20px", padding: "10px 20px" }}>
    {loading ? "Processing..." : "Optimize Resume"}
</button>

            <ResultDisplay enhancedResumeUrl={enhancedResumeUrl} />
        </div>
    );
}

export default App;