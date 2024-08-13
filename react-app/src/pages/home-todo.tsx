import axios from 'axios';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import ServiceDeskLayout from '../components/layout/ServiceDeskLayout';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

// Define the types for Task props
interface TaskProps {
  id: number;
  notes: string;
  index: number;
  removeTask: (id: number) => void;
}

// Define the type for TodoItem
interface TodoItem {
  id: number;
  // Add other properties as needed
}

// This segment contains the logic that displays each individual task present in the to-do list
const Task = forwardRef<HTMLDivElement, TaskProps>(({ id, notes, index, removeTask }, ref) => {
  const [deleting, setDeleting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const onMouseEnter = useCallback(() => {
    setShowOptions(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setShowOptions(false);
  }, []);

  const deleteTask = useCallback(() => {
    setDeleting(true);
    axios
      .delete(`/server/todo_list_advanced_function/${id}`) // Ensure correct URL
      .then((response) => {
        const { data: { todoItem: { id } } } = response.data;
        removeTask(id);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setDeleting(false);
      });
  }, [id, removeTask]);

  return (
    <div
      className='task'
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p className='task__no'>{index + 1 + ') '}</p>
      <p className='task__title'>{notes}</p>
      {deleting ? (
        <div className='loader-xs'></div>
      ) : (
        showOptions && (
          <button onClick={deleteTask}>
            <svg
              className='task__btn'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              ></path>
            </svg>
          </button>
        )
      )}
    </div>
  );
});

// Define the types for App component state
interface TodoItem {
  id: number;
  notes: string;
}

// This segment contains the logic for loading the application
function HomeTodo() {
  const observer = useRef<IntersectionObserver | null>(null);
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState('');
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetchState, setFetchState] = useState<'init' | 'loading' | 'fetched'>('init');

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNotes(value);
  }, []);

  useEffect(() => {
    if (fetchState !== 'fetched') {
      axios
        .get('/server/todo_list_advanced_function/all', { // Ensure correct URL
          params: { page, perPage: 200 } // The parameters contain the start limit and the end limit of data (tasks) that can be fetched from the data store
        })
        .then((response) => {
          console.log(response.data);
          const { data: { todoItems, hasMore } } = response.data;
          if (page === 1) {
            setTodoItems(todoItems);
          } else {
            // Assuming setTodoItems is a function that takes a callback
            setTodoItems((prev: TodoItem[]): TodoItem[] => {
              const mergedItems = prev.concat(todoItems);
              const uniqueItems = mergedItems.reduce((acc: TodoItem[], current: TodoItem) => {
                if (!acc.some(item => item.id === current.id)) {
                  acc.push(current);
                }
                return acc;
              }, []);
              return uniqueItems;
            });
          }
          setHasMore(hasMore);
          setFetchState('fetched');
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [fetchState, page]);

  const lastElement = useCallback(
    (node: HTMLDivElement | null) => {
      if (fetchState !== 'fetched') {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((c) => c + 1);
          setFetchState('loading');
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [fetchState, hasMore]
  );

  // This segment contains the logic for creating a new task
  const createTodo = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitting(true);
      axios
        .post('/server/todo_list_advanced_function/add', { notes }) // Ensure correct URL
        .then((response) => {
          const { data: { todoItem } } = response.data;
          setNotes('');
          setTodoItems((prev) => [{ ...todoItem }, ...prev]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    [notes]
  );

  // This segment contains the logic for deleting a task from the application
  const removeTask = useCallback((id: number) => {
    setTodoItems((prev) => prev.filter((obj) => obj.id !== id));
  }, []);

  return (
    <ServiceDeskLayout>
        {fetchState === 'init' ? (
            <div className='dF aI-center jC-center h-inh'>
            <div className='loader-lg'></div>
            </div>
        ) : (
            <>
            <div>
                <form onSubmit={createTodo}>
                  <TextField
                    fullWidth
                    id="standard-bare"
                    variant="outlined"
                    placeholder="Enter a new Task"
                    value={notes}
                    onChange={onChange}
                    InputProps={{
                      endAdornment: (
                        <IconButton type="submit">
                          <Add />
                        </IconButton>
                      ),
                    }}
                  />

                  {/* <input
                      type='text'
                      value={notes}
                      onChange={onChange}
                      placeholder='Enter a Task'
                      className='input input-valid'
                      readOnly={submitting}
                  />
                  <button
                      className='btn btn-primary ml-10'
                      disabled={!notes.length || submitting}
                      type='submit'
                  >
                      Create Task
                      {submitting && (
                      <div className='btn-primary__loader ml-5'></div>
                      )}
                  </button> */}
                </form>
            </div>
            <div className=''>
                {todoItems.length ? (
                todoItems.map((item, index) => (
                    <Task
                    key={item.id}
                    {...item}
                    ref={index === todoItems.length - 1 ? lastElement : null}
                    index={index}
                    removeTask={removeTask}
                    />
                ))
                ) : (
                <div className='p-20 dF jC-center'>
                    <p className='text-info text-16'>
                    No tasks available, Create a new task.
                    </p>
                </div>
                )}
                {fetchState === 'loading' && (
                <div className='dF jC-center my-5'>
                    <div className='loader-sm'></div>
                </div>
                )}
            </div>
            </>
        )}
    </ServiceDeskLayout>
  );
}

export default HomeTodo;
