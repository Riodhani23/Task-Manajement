import React, { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loader';
import Title from '../components/Title';
import Button from '../components/Button';
import { IoMdAdd } from 'react-icons/io';
import Tabs from '../components/Tabs';
import TaskTitle from '../components/TaskTitle';
import BoardView from '../components/BoardView';
import Table from '../components/task/Table';
import AddTask from '../components/task/AddTask';
import { useGetAllTaskQuery } from '../redux/slices/api/taskApiSlice';

const TABS = [
  { title: 'Board View', icon: <MdGridView /> },
  { title: 'List View', icon: <FaList /> },
];

const TASK_TYPE = {
  todo: 'bg-green-600',
  'in progress': 'bg-yellow-600',
  completed: 'bg-green-600',
};

const Tasks = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const status = params?.status || '';

  const { data, isLoading } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: '',
    search: search,
    page: selected === 1 ? page : 1,
    limit: selected === 1 ? 15 : 0,
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const renderPageNumbers = () => {
    if (!data?.pages) return null;

    const pages = [];
    for (let i = 1; i <= data.pages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-2 py-1 rounded ${page === i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 flex-col md:flex-row">
        <Title title={status ? `${status} Tasks` : 'Tasks'} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-green-600 text-white rounded-md py-2 2xl:py-2.5 mt-4 md:mt-0"
          />
        )}
      </div>

      <div className="mb-4 flex justify-center md:justify-start">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full p-2 pl-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <Tabs
        tabs={TABS}
        setSelected={setSelected}
      >
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle
              label="To Do"
              className={TASK_TYPE.todo}
            />
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE['in progress']}
            />
            <TaskTitle
              label="Completed"
              className={TASK_TYPE.completed}
            />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={data?.tasks} />
        ) : (
          <div className="w-full">
            <Table tasks={data?.tasks} />
            <div className="flex justify-center mt-4">
              {renderPageNumbers()}
            </div>
          </div>
        )}
      </Tabs>

      <AddTask
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Tasks;
