import React, { useState } from "react";
import toast from "react-hot-toast";
import useServer from "../../hooks/useServer";
import useToken from '../../hooks/useToken'

const CreateJobForm = () => {
    const Server = useServer();
    const token=useToken()
    const [jobData, setJobData] = useState({
        title: "",
        description: "",
        responsibilities: [""],
        qualifications: [""],
        skills: [""],
        location: "",
        salaryRange: { min: "", max: "" },
        employmentType: "",
        experienceLevel: "",
        companyName: "",
    });
    const [loader, setLoader] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    const handleArrayChange = (e, index, field) => {
        const newValue = [...jobData[field]];
        newValue[index] = e.target.value;
        setJobData({ ...jobData, [field]: newValue });
    };

    const handleAddArrayField = (field) => {
        setJobData({ ...jobData, [field]: [...jobData[field], ""] });
    };

    const handleSalaryChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, salaryRange: { ...jobData.salaryRange, [name]: value } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        console.log(jobData);
        try {
            const res = await fetch(`${Server}/emp/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({jobData,token}),
            });
            const resData = await res.json();
            const { error, message, data } = resData;
            if (error) {
                return toast.error(message);
            }
            toast.success("Job created successfully!");
            setJobData({
                title: "",
                description: "",
                responsibilities: [""],
                qualifications: [""],
                skills: [""],
                location: "",
                salaryRange: { min: "", max: "" },
                employmentType: "",
                experienceLevel: "",
                companyName: "",
            });
        } catch (error) {
            toast.error("Failed to create job");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Create Job</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={jobData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={jobData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Responsibilities</label>
                    {jobData.responsibilities.map((responsibility, index) => (
                        <input
                            key={index}
                            type="text"
                            value={responsibility}
                            onChange={(e) => handleArrayChange(e, index, "responsibilities")}
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                            required
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddArrayField("responsibilities")}
                        className="bg-gray-500 text-white py-1 px-3 rounded"
                    >
                        Add Responsibility
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Qualifications</label>
                    {jobData.qualifications.map((qualification, index) => (
                        <input
                            key={index}
                            type="text"
                            value={qualification}
                            onChange={(e) => handleArrayChange(e, index, "qualifications")}
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                            required
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddArrayField("qualifications")}
                        className="bg-gray-500 text-white py-1 px-3 rounded"
                    >
                        Add Qualification
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Skills</label>
                    {jobData.skills.map((skill, index) => (
                        <input
                            key={index}
                            type="text"
                            value={skill}
                            onChange={(e) => handleArrayChange(e, index, "skills")}
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                            required
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddArrayField("skills")}
                        className="bg-gray-500 text-white py-1 px-3 rounded"
                    >
                        Add Skill
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={jobData.location}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Salary Range</label>
                    <input
                        type="text"
                        name="min"
                        value={jobData.salaryRange.min}
                        onChange={handleSalaryChange}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        placeholder="Min"
                        required
                    />
                    <input
                        type="text"
                        name="max"
                        value={jobData.salaryRange.max}
                        onChange={handleSalaryChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Max"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Employment Type</label>
                    <input
                        type="text"
                        name="employmentType"
                        value={jobData.employmentType}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Experience Level</label>
                    <input
                        type="text"
                        name="experienceLevel"
                        value={jobData.experienceLevel}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={jobData.companyName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    disabled={loader}
                >
                    {loader ? "Creating..." : "Create Job"}
                </button>
            </form>
        </div>
    );
};

export default CreateJobForm;
