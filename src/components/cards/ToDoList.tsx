import { ITodolist } from '@interfaces/index';
import { Card, ToDoListRow } from '@ui/index';
import { createTodolist } from '@utils/index';
import { useEffect, useState } from 'react';

interface props {
    time: 'range' | 'specific' | 'short';
    todolistType?: string;
    className?: string;
    linkState?: boolean;
}

const ToDoList = ({ time, className, linkState, todolistType }: props) => {
    const [loading, setLoading] = useState(false);

    // const initialData: ITodolist[] = useTodolist().filter((e: ITodolist) => {
    //     if (todolistType) {
    //         return (
    //             dateBetween(e.properties.Date.date.start, e.properties.Deadline.date.start, ISOToday()) &&
    //             e.properties.Type.select.name == todolistType
    //         );
    //     }
    //     return e.properties.Date.date.start == ISOToday();
    // });
    const [data, setData] = useState<ITodolist[]>([]);
    const [update, setUpdate] = useState('');
    const [type, setType] = useState(todolistType || '');

    const updateTodolistTask = (e: ITodolist) => {
        setData([...data, e]);
    };
    const updateLoading = (e: boolean) => {
        setLoading(e);
    };
    const updateState = (e: string) => {
        setUpdate(e);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (update !== '') {
                setType(update.split('type=')[1]);
                let from = true;
                await fetch(
                    `http://localhost:3000/api/todolist?${from && `date=${update + (update.split('type=')[1] ? '' : '&type=Day')}`}`
                )
                    .then((res) => res.json())
                    .then(
                        (result) => {
                            setData(result);
                            setLoading(false);
                        },
                        (error) => {
                            console.log(error);
                        }
                    )
                    .catch((err) => console.log(err));
            }
        };
        fetchData();
    }, [update]);

    return (
        <Card
            header={`${todolistType ? todolistType + ' ' : ''}To do list`}
            linkState={linkState}
            link="/todolist"
            time={time}
            loading={loading}
            updateState={updateState}
            updateLoading={updateLoading}
            todolist={true}
            todolistType={todolistType}
            className={className}
        >
            <div className={`flex ${data.length > 0 ? 'flex-col gap-2 font-medium' : 'items-center justify-center pb-4'}`}>
                {data.length > 0 &&
                    data.map((e: ITodolist) => <ToDoListRow key={e.id} data={e} updateLoading={updateLoading} loading={loading} />)}
                <button
                    onClick={() => {
                        setLoading(true);
                        createTodolist(updateTodolistTask, type, updateLoading);
                    }}
                    className={`${
                        data.length > 0 ? 'text-xl' : 'text-center text-6xl font-thin'
                    } text-character cursor-pointer w-fit hover:text-white transition ${loading ? 'cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    +
                </button>
            </div>
        </Card>
    );
};

export default ToDoList;
