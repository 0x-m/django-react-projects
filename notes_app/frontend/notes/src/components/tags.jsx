
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api';
import { getTokens } from '../api';

function Tag(props) {
    return (
        <div className="p-2 rounded-md flex items-center gap-2 w-fit bg-slate-100">
            <span>{props.name}</span>
            <i onClick={() => props.onClick(props.id)} className="bi-x text-lg text-gray-500 cursor-pointer hover:text-gray-900"></i>
        </div>

    );
}

function AddTag(props) {
    const [name, setName] = useState('');
    const handleAdd = () => {
        if (name.trim().length != 0) {
            fetch('http://localhost:8000/api/v1/tags/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getTokens()['access']
                },
                body: JSON.stringify(
                    {
                        "name": name
                    }
                )
            }).then(resp => {
                if (resp.ok) {

                    resp.json().then(j => props.afterAdd(j));
                }
            });
        }
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    return (
        <div className="w-11/12 md:w-1/2 flex flex-col mx-auto rounded">
            <input onChange={handleName} placeholder="Tag name" type="text"
                className="p-3 text-gray-500 bg-white outline-none ss rounded" />
            <div className="flex mt-3  justify-end">
                <button onClick={handleAdd} className="bg-sky-600 shadow p-2 text-white px-4 rounded">Add</button>
            </div>
        </div>
    );
}

function Tags(props) {

    const [tags, setTags] = useState([]);

    useEffect(() => {

        // Fetch data
        async function getTags() {
            const resp = await fetch('http://localhost:8000/api/v1/tags/', {
                method: "GET",
                headers: { "Authorization": "Bearer " + getTokens()['access'] }
            });

            const data = await resp.json();
            setTags(data['results']);
        }

        getTags();


    }, []);

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace={true} />
    }

    const afterAdd = (tag) => {
        setTags((prev) => [...prev, tag]);
    }

    const handleDelete = (key) => {
        fetch(`http://localhost:8000/api/v1/tags/${key}/`, {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + getTokens()['access'] }
        }).then(resp => {
            if (resp.ok) {
                setTags((prev) => {
                    return prev.filter(item => item.id != key);
                });
            }
        });
    }
    return (
        <div className='flex flex-col gap-4'>
            <AddTag afterAdd={afterAdd} />
            <div className="w-11/12 md:w-3/4 mx-auto mt-16 text-gray-700 text-sm p-2 flex gap-2 flex-wrap">
                {
                    tags.map((tag) => {
                        return (<Tag key={tag.id} onClick={handleDelete} id={tag.id} name={tag.name} />);
                    })
                }
            </div>
        </div>
    );
}


export { Tags };

