import React, { useEffect } from 'react';
import Title from '../components/Title';
import { useGetActivityLogsQuery } from '../redux/slices/api/userApiSlice';
import Loading from '../components/Loader';
import moment from 'moment';

const ActivityLogs = () => {
  const { data: logs, isLoading, refetch } = useGetActivityLogsQuery();

  useEffect(() => {
    refetch(); 
  }, []);

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">User</th>
        <th className="py-2">Action</th>
        <th className="py-2">Task</th>
        <th className="py-2">Modified On</th>
      </tr>
    </thead>
  );

  const TableRow = ({ log }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">{log.user?.name}</td>
      <td className="py-2">{log.action}</td>
      <td className="py-2">{log.task?.title}</td>
      <td className="py-2">{moment(log.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
    </tr>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <Title title="Activity Logs" className="text-xl md:text-2xl" />
        </div>

        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {logs?.logs.map((log, index) => (
                  <TableRow key={index} log={log} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityLogs;
