import { type FormEvent, useState } from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";

const Upload = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {}

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>

                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>

                            <img src="/images/resume-scan.gif" className="w-full"/>
                        </>
                    ) : (
                        <h2>
                            Drop your resume for an ATS score and improvement tips
                        </h2>
                    )}
                </div>

                {!isProcessing && (
                    <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                        <div className="form-div">
                            <label htmlFor="company-name">Company Name</label>
                            <input type="text" name="company-name" placeholder="Company Name" id="company-name"/>
                        </div>

                        <div className="form-div">
                            <label htmlFor="job-title">Job Title</label>
                            <input id="job-title" name="job-title" type="text" placeholder="Job Title"/>
                        </div>

                        <div className="form-div">
                            <label htmlFor="job-description"> Job Description</label>
                            <textarea id="job-description" name="job-description" rows={5} placeholder="Job Description"/>
                        </div>

                        <div className="form-div">
                            <label htmlFor="uploader">Upload Resume</label>
                            <FileUploader/>
                        </div>

                        <button type="submit" className="primary-button">
                            Analyze Resume
                        </button>
                    </form>
                )}
            </section>
        </main>
    );
};

export default Upload;