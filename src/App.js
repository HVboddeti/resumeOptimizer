const handleUpload = async () => {
    if (!resume || !jobDescription) {
        alert("Please upload a resume and enter a job description.");
        return;
    }

    // Convert file to Base64 (because Lambda can't process raw files directly from API Gateway)
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 data
            reader.onerror = (error) => reject(error);
        });
    };

    try {
        const resumeBase64 = await convertToBase64(resume); // Convert file to Base64

        const payload = {
            bucket: "resumestorage-bucket",
            file_name: resume.name,
            job_description: jobDescription,
            resume_content: resumeBase64 // Pass Base64 content
        };

        const response = await fetch("https://t9qpgcd3w3.execute-api.us-east-1.amazonaws.com/start/processResume", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (data.enhanced_resume_url) {
            setEnhancedResumeUrl(data.enhanced_resume_url);
        } else {
            alert("Error: " + (data.error || "Something went wrong!"));
        }
    } catch (error) {
        console.error("Error uploading resume:", error);
    }
};