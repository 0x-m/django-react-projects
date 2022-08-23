
import { useState, useEffect } from 'react'

const sample_tags = ["programming", "work", "learn", "web"];


function TagBar(props) {

    const [tags, setTags] = useState([])


    useEffect(() => {
        //fetch data
        setTags(sample_tags);

    }, [tags]);


    return (
        <div className='flex flex-col gap-4'>

            <section className="mt-4 w-11/12 p-2  text-sm font-extrabold text-gray-800 flex gap-2 mx-auto">
                {
                    tags.map((tag) => (
                        <label class="select-none cursor-pointer">
                            <input type="checkbox" value={tag} class="peer hidden" />
                            <span className="peer-checked:bg-sky-600 peer-checked:text-white p-2 rounded">{tag}</span>
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
function Note(props) {
    console.log(props)
    return (
        <article className="flex flex-col p-4 basis-1/4 bg-white rounded-sm shadow">
            <span className="text-gray-400 text-xs">{props.date}</span>
            <h4 class="text-gray-600 mt-2">{props.title}</h4>
            <p class="text-xs text-gray-400 mt-4  ">
                {props.body}
            </p>
            <div className="flex gap-1 text-gray-500 text-[0.6rem] mt-4 flex-wrap">
                {
                    props.tags.map((tag) =>
                        <span className="rounded-sm p-1 bg-gray-700 text-white">{tag}</span>
                    )
                }
            </div>
        </article>

    );
}


function AddNoteButton(props) {
    return (
        <section className="flex justify-end mt-2">
            <button className="flex gap-1 m-4 p-2 hover:bg-slate-100 rounded items-center">
                <i className="bi-plus text-4xl text-green-600"></i>
                <span className="text-xl text-gray-600">Add a Note</span>
            </button>
        </section>

    );
}

const note_data = [
    {
        date: "22/22/10",
        title: "hello",
        body: "this is for example",
        tags: ["programming", "business"]

    },
    {
        date: "22/22/11",
        title: "it's a good day",
        body: "this is a wonderful day.",
        tags: ["programming", "business"]

    },
    {
        date: "22/4/10",
        title: "gjjfg",
        body: "it's ok",
        tags: ["programming", "business"]

    }


];

function Notes(props) {
    const [noteItems, setNoteItems] = useState([]);
    useEffect(() => {
        //fetch data
        setNoteItems(note_data);
        console.log('useeffect exectued..')

    }, [noteItems]);
    return (
        <div className='flex flex-col gap-4'>
            <AddNoteButton />
            <TagBar />
            <section className="mt-8 gap-2 p-4 grid grid-cols-1 md:grid-cols-4 w-full">
                {
                    noteItems.map((note) => {
                        return (<Note {...note} />);
                    })
                }
            </section>
        </div>
    );
}

export { Notes }