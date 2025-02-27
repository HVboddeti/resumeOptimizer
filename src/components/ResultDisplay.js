import React from "react";

function ResultDisplay({ enhancedResumeUrl }) {
    return (
        <div style={{ marginTop: "20px" }}>
            {enhancedResumeUrl && (
                <div>
                    <h3>Optimized Resume Ready</h3>
                    <a href={enhancedResumeUrl} target="_blank" rel="noopener noreferrer">
                        Download Optimized Resume
                    </a>
                </div>
            )}
        </div>
    );
}

export default ResultDisplay;
