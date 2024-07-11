import { useCallback, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import useServer from '../../hooks/useServer';
import AboutApplications from "./appli-about";
import { formatDistanceToNow } from "date-fns";
import useToken from '../../hooks/useToken'

const Applications = () => {
    const Server = useServer();
    const [loader, setLoader] = useState(false);
    const [applications, setApplications] = useState([]);
    const [ApplicationDetail, setApplicationDetail] = useState(null)
    const token=useToken();

    const fetchData = useCallback(async () => {
        try {
            setLoader(true);
            const res = await fetch(`${Server}/emp/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body:JSON.stringify({token}),
                withCredentials: true,
            });
            const resData = await res.json();
            const { error, message, data } = resData;
            if (error) {
                return toast.error(message);
            }
            if (data) setApplications(data);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                return toast.error(error?.response?.data?.message);
            } else {
                return toast.error("Failed to fetch Data");
            }
        } finally {
            setLoader(false);
        }
    }, [Server]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getRelativeTime = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };



    console.log(applications);
    return (
        <>
            {
                ApplicationDetail ? <AboutApplications setApplicationDetail={setApplicationDetail} data={ApplicationDetail} />
                    :

                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Posted At</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Applied At</th>
                                <th className="px-6 py-3 border-b border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications?.map((application, index) => (
                                <tr key={index} className="">
                                    <td className="px-6 py-4 whitespace-nowrap">{application?.jobId?.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{application?.jobId?.companyName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(application?.jobId?.postedAt).toLocaleDateString()}</td>
                                    <td >
                                        <span className={` whitespace-nowrap  px-4 py-1 rounded-full
                        ${application?.status == 'Accept' ? 'bg-green-400' : 'bg-red-300'}
                        `}>

                                            {application?.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{getRelativeTime(application?.appliedAt)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => setApplicationDetail(application)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
        </>
    );
};

export default Applications;
