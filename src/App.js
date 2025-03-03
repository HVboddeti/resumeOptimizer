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
    
        // ✅ Convert file to Base64
        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 content
                reader.onerror = (error) => reject(error);
            });
        };
    
        try {
            const resumeBase64 = await convertToBase64(resume); // Convert file
    
            const payload = {
                bucket: "resumestorage-bucket",
                file_name: resume.name,
                tex_file: "main.tex",  // ✅ Ensure tex_file is included
                job_description: jobDescription,
                resume_content: resumeBase64 // Pass Base64 content
            };
    
            console.log("📤 Sending request with payload:", payload); // ✅ Debugging
    
            const response = await fetch("https://t9qpgcd3w3.execute-api.us-east-1.amazonaws.com/start/processResume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
    
            console.log("📥 Received response:", response);
    
            const data = await response.json();
            console.log("✅ API Response Data:", data);
    
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
            
            <button 
                onClick={handleUpload} 
                style={{ marginTop: "20px", padding: "10px 20px" }} 
                disabled={loading}  // ✅ Disable button while loading
            >
                {loading ? "Processing..." : "Optimize Resume"}  {/* ✅ Show running time */}
            </button>

            <ResultDisplay enhancedResumeUrl={enhancedResumeUrl} />
        </div>
    );
}

export default App;