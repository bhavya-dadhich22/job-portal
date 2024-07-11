import { useCallback, useEffect, useState } from "react";
import useServer from "../../hooks/useServer";
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import useToken from "../../hooks/useToken";

const AppliedJobsPage = () => {
    const Server = useServer();
    const [loading, setLoading] = useState(false);
    const [AppliedJob, setAppliedJob] = useState([]);
    const token = useToken();



    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`${Server}/user/applied/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    token
                }),
                withCredentials: true,
            });
            const resData = await res.json();
            const { error, message, data } = resData;
            if (error) {
                return toast.error(message);
            }
            setAppliedJob(data);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error("Failed to fetch Data");
            }
        } finally {
            setLoading(false);
        }
    }, [Server]);

    useEffect(() => {
        fetchData()
    }, [Server, fetchData]);

    const getRelativeTime = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };


    return (
        <div>
            {
                loading ?
                    <h1 className=" my-10 text-xl">loading..</h1> :
                    <section className="container px-4 mx-auto">
                        <div className="flex flex-col">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                        Job Title
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                        Company
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                        Location
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                        Applied At
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 text-start">
                                                {
                                                    AppliedJob?.map((item) => {
                                                        return (

                                                            <tr key={item?._id}>
                                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                    {item?.jobId?.title}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                    {item?.jobId?.companyName}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                    {item?.jobId?.location}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${item.status === "Applied" ? "text-emerald-500 bg-emerald-100/60" : "text-gray-500 bg-gray-100/60"}`}>
                                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                        <h2 className="text-sm font-normal">{item?.status}</h2>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                    {getRelativeTime(item.appliedAt)}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                    <Link to={`/job/${item?.jobId?._id}`}>
                                                                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                                            View Job details
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

            }
        </div>
    )
}

export default AppliedJobsPage
