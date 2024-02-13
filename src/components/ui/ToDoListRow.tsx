import { useEffect, useState } from 'react';
import axios from 'axios';

import { ITodolist } from '@interfaces/index';

interface props {
    data: ITodolist;
    loading: boolean;
    updateLoading: (e: boolean) => void;
}

const ToDoListRow = ({ data, loading, updateLoading }: props) => {
    const [checkbox, setCheckbox] = useState(data.properties.Done.checkbox);
    const [name, setName] = useState(data.properties.Name.title[0].text.content);
    const [sendName, setSendName] = useState(data.properties.Name.title[0].text.content);
    const [priority, setPriority] = useState(data.properties.Priority.select?.name || 'null');
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (update) {
            updateLoading(true);
            axios
                .get(`/api/todolist/edit?id=${data.id}&name=${sendName}&priority=${priority}&done=${checkbox}`)
                .then(() => updateLoading(false))
                .catch((err) => {
                    updateLoading(false);
                    console.log(err);
                });
        }
    }, [checkbox, sendName, priority]);

    const blurNameHandler = (e: any) => {
        if (e.target.value !== sendName) {
            setSendName(e.target.value);
        }
    };

    return (
        <form className="flex justify-between items-center gap-2">
            <input
                checked={checkbox}
                onChange={() => {
                    setCheckbox(!checkbox);
                    setUpdate(true);
                }}
                disabled={loading}
                type="checkbox"
                className="checkbox checkbox-success checkbox-xs sm:checkbox-sm rounded-full sm:border-2"
            />
            <div className="relative group h-8 w-36 sm:w-24" data-tip={name}>
                <input
                    value={name}
                    onBlur={(e) => blurNameHandler(e)}
                    onChange={(e) => {
                        setName(e.target.value);
                        setUpdate(true);
                    }}
                    disabled={loading}
                    type="text"
                    placeholder="Task"
                    className={`input input-ghost w-36 sm:w-24 text-sm h-8 p-1 disabled:text-white disabled:bg-transparent disabled:shadow-none disabled:border-transparent ${
                        name.length > 12 ? 'hover:absolute top-0 left-0 hover:w-44' : ''
                    }`}
                />
            </div>
            <select
                defaultValue={priority}
                onChange={(e) => {
                    setPriority(e.target.value);
                    setUpdate(true);
                }}
                disabled={loading}
                name=""
                id=""
                className="select select-ghost text-xs px-2 select-sm text-main focus:bg-focus disabled:bg-transparent disabled:shadow-none disabled:border-transparent"
            >
                <option value="null">⚫</option>
                <option value="High">🟢</option>
                <option value="Medium">🔵</option>
                <option value="Low">🔴</option>
            </select>
        </form>
    );
};
export default ToDoListRow;
