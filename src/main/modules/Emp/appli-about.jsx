/* eslint-disable react/prop-types */
import { useState } from 'react';
import toast from 'react-hot-toast'
import useServer from '../../hooks/useServer'

const AboutApplications = ({ data, setApplicationDetail }) => {
    const Server = useServer();
    const [loader, setLoader] = useState(false)

    const handleButton = async (msg) => {
        try {
            setLoader(true);
            if (!data._id) return toast.error('Unable to update status');
            const res = await fetch(`${Server}/emp/applications/status/${data._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: msg }),
                credentials: 'include',
                withCredentials: true,
            });
            const resData = await res.json();
            const { error, message } = resData;
            if (error) {
                return toast.error(message);
            }
            toast.success(message)
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                return toast.error(error?.response?.data?.message);
            } else {
                return toast.error("Failed to Update");
            }
        } finally {
            setLoader(false);
        }
    };

    const {
        userId: {
            name,
            email,
            phone,
            userInfo: {
                skills,
                education,
                experience,
                address,
                city,
                state,
                country,
                githubProfile,
                linkedInProfile,
                portfolioUrl,
                postalCode,
                resumeUrl,
                website,
            },
        },
        jobId: {
            salaryRange,
            title,
            description,
            qualifications,
            responsibilities,
            skills: jobSkills,
            location,
            employmentType,
            experienceLevel,
            companyName,
            postedAt,
        },
        companyId: {
            industry,
            phone: companyPhone,
            website: companyWebsite,
            about: { desc, address: companyAddress },
        },
        status,
        appliedAt,
    } = data;

    return (
        <div className="max-w-3xl mx-auto relative">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Job Application Details</h2>
                <button title="close" className=" px-3 bg-slate-200 absolute right-6 top-5 " onClick={() => setApplicationDetail(null)}>X</button>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Job Details</h3>
                    <p><strong>Title:</strong> {title}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Location:</strong> {location}</p>
                    <p><strong>Salary Range:</strong> {salaryRange.min} - {salaryRange.max}</p>
                    <p><strong>Employment Type:</strong> {employmentType}</p>
                    <p><strong>Experience Level:</strong> {experienceLevel}</p>
                    <p><strong>Company Name:</strong> {companyName}</p>
                    <p><strong>Posted At:</strong> {new Date(postedAt).toLocaleDateString()}</p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Company Details</h3>
                    <p><strong>Industry:</strong> {industry}</p>
                    <p><strong>Company Address:</strong> {companyAddress}</p>
                    <p><strong>Company Phone:</strong> {companyPhone}</p>
                    <p><strong>Company Website:</strong> <a href={companyWebsite} className="text-blue-500 underline">{companyWebsite}</a></p>
                    <p><strong>About Company:</strong> {desc}</p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Applicant Details</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Phone:</strong> {phone}</p>
                    <p><strong>Address:</strong> {`${address}, ${city}, ${state}, ${country}, ${postalCode}`}</p>
                    <p><strong>GitHub Profile:</strong> <a href={githubProfile} className="text-blue-500 underline">{githubProfile}</a></p>
                    <p><strong>LinkedIn Profile:</strong> <a href={linkedInProfile} className="text-blue-500 underline">{linkedInProfile}</a></p>
                    <p><strong>Portfolio URL:</strong> <a href={portfolioUrl} className="text-blue-500 underline">{portfolioUrl}</a></p>
                    <p><strong>Resume URL:</strong> <a href={resumeUrl} className="text-blue-500 underline">{resumeUrl}</a></p>
                    <p><strong>Website:</strong> <a href={website} className="text-blue-500 underline">{website}</a></p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap">
                        {skills.map((skill, index) => (
                            <span key={index} className="bg-gray-200 px-2 py-1 rounded-md text-sm mr-2 mb-2">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Education</h3>
                    <ul className="list-disc list-inside">
                        {education.map((edu, index) => (
                            <li key={index}>{edu.course} - {edu.collegeName} ({edu.year})</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Experience</h3>
                    <ul className="list-disc list-inside">
                        {experience.map((exp, index) => (
                            <li key={index}>{exp.position} at {exp.company} ({exp.years} years)</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Qualifications</h3>
                    <ul className="list-disc list-inside">
                        {qualifications.map((qual, index) => (
                            <li key={index}>{qual}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Responsibilities</h3>
                    <ul className="list-disc list-inside">
                        {responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Job Skills</h3>
                    <ul className="list-disc list-inside">
                        {jobSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Application Status</h3>
                    <p><strong>Status:</strong> {status}</p>
                    <p><strong>Applied At:</strong> {new Date(appliedAt).toLocaleDateString()}</p>
                </div>

                <div className="mb-6 flex justify-center">
                    <>
                        <button onClick={() => handleButton('Reject')} className="bg-red-500 text-white py-2 px-4 rounded mr-4 hover:bg-red-600">Reject</button>
                        <button onClick={() => handleButton('Accept')} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Proceed</button>
                    </>
                </div>
                {
                    loader && 'Updating status..'
                }

            </div>
        </div>
    );
};

export default AboutApplications;
