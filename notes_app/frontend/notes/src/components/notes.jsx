
import { useState, useEffect } from 'react'
import { getTokens, isAuthenticated } from '../api';
import { Navigate } from 'react-router-dom';



function TagBar(props) {
    const [tags, setTags] = useState([])
    useEffect(() => {
        //fetch data
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


    return (
        <div className='flex  flex-col gap-4'>

            <section className="mt-4 w-11/12 p-2  text-sm font-extrabold text-gray-800 flex gap-2 mx-auto">
                {
                    tags.map((tag) => (
                        <label key={tag.id} class="select-none cursor-pointer">
                            <input type="checkbox" value={tag.id} class="peer hidden" />
                            <span className="peer-checked:bg-sky-600 peer-checked:text-white p-2 rounded">{tag.name}</span>
                        </label>
                    ))
                }

            </section>
            <div className="flex p-4 mt-2 justify-end">
                <button type="submit" className="p-2 text-white rounded shadow text-sm px-4 bg-gray-600">Apply tags</button>
            </div>
        </div>

    );
}



function AddModal(props) {
    const [tags, setTags] = useState([]);

    useEffect(() => {
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


    const handleAddNote = (e) => {
        e.preventDefault();
        const selectedTags = Array.from(
            e.target.querySelectorAll('[name="tags"]')).
            filter((item) => item.checked == true).
            map(item => item.value);

        console.log(selectedTags);
        const data = Object.fromEntries(new FormData(e.target).entries());
        data["tags"] = selectedTags;

        fetch('http://localhost:8000/api/v1/notes/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getTokens()['access']
            },
            body: JSON.stringify(data)
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(json => {
                    props.afterAdd(json);
                });
            }
        });
    }
    return (
        <div id="add-modal" className={`absolute ${props.show ? 'flex' : 'hidden'}  bg-red-400  z-10 items-center justify-center left-0 top-0 w-full h-screen`}
            style={{ "backgroundColor": "#2228" }}>
            <div className="w-11/12 relative  md:w-1/2 rounded p-4  bg-white ss">
                <button onClick={props.onClose} className="absolute right-1 top-1 p-1">
                    <i className="bi-x text-black text-xl"></i>
                </button>
                <form onSubmit={handleAddNote} id="the-form" className="p-2 m-1 flex flex-col">
                    <input type="hidden" name="note_id" value="" />
                    <input name="title" placeholder="Title" type="text" className="p-1 outline-none text-lg text-gray-800 w-full" />
                    <textarea placeholder="Body..." name="body" id=""
                        className="p-1 resize-none outline-none text-sm text-gray-600 w-full mt-2" cols="30" rows="5"></textarea>
                    <section name="tags" className="mt-2 w-full p-2  text-sm font-extrabold text-gray-800 flex gap-1 flex-wrap">
                        {
                            tags.map((tag) => {
                                return (
                                    <label key={tag.id} className="select-none cursor-pointer p-2">
                                        <input type="checkbox" name="tags" value={tag.id} className="peer hidden"
                                        />
                                        <span className="peer-checked:bg-sky-600 peer-checked:text-white p-2 rounded">{tag.name}</span>
                                    </label>
                                );
                            })
                        }

                    </section>

                    <div className="flex justify-end gap-2 mt-2 p-1">
                        <button id="delete-btn"
                            className="p-2 hidden text-white bg-red-500 px-4 rounded">Delete</button>
                        <button className="p-2 text-white bg-sky-500 px-4 rounded">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Note(props) {

    return (
        <article className="flex flex-col p-4 basis-1/4 bg-white rounded-sm shadow">
            <span className="text-gray-400 text-xs">{props.date}</span>
            <h4 class="text-gray-600 mt-2">{props.title}</h4>
            <p class="text-xs text-gray-400 mt-4  ">
                {props.body}
            </p>
            <div className="flex gap-1 text-gray-500 text-[0.6rem] mt-4 flex-wrap">
                {
                    props.tags_name.map((tag, index) =>
                        <span key={index} className="rounded-sm p-1 bg-gray-700 text-white">{tag}</span>
                    )
                }
            </div>
        </article>

    );
}


function AddNoteButton(props) {
    return (
        <section className="flex justify-end mt-2">
            <button onClick={props.onClick} className="flex gap-1 m-4 p-2 hover:bg-slate-100 rounded items-center">
                <i className="bi-plus text-4xl text-green-600"></i>
                <span className="text-xl text-gray-600">Add a Note</span>
            </button>
        </section>

    );
}

function Notes(props) {
    const [noteItems, setNoteItems] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    useEffect(() => {
        const accessToken = getTokens()['access'];
        async function getNotes() {
            const resp = await fetch('http://localhost:8000/api/v1/notes', {
                method: "GET",
                headers: { "Authorization": "Bearer " + accessToken },
            })

            const notes = await resp.json()
            setNoteItems(notes['results']);
        }

        getNotes();

    }, []);


    const toggleAddDialog = () => {
        setShowDialog((prev) => !prev);
    }

    const afterAdd = (note) => {
        setNoteItems((prev) => [...prev, note]);
        toggleAddDialog();
    }

    if (isAuthenticated()) {
        return (
            <div className='flex flex-col gap-4'>
                <AddNoteButton onClick={toggleAddDialog} />
                <AddModal afterAdd={afterAdd} onClose={toggleAddDialog} show={showDialog} />
                <TagBar />
                <section className="mt-8 gap-2 p-4 grid grid-cols-1 md:grid-cols-4 w-full">
                    {
                        noteItems.map((note) => {
                            return (<Note key={note.id} {...note} />);
                        })
                    }
                </section>
            </div>
        );
    }
    else {
        return <Navigate to="/login" replace={true} />
    }
}

export { Notes }