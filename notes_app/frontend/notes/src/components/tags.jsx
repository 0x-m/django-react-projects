
import { useState, useEffect } from 'react'


function Tag(props) {
    return (
        <div className="p-2 rounded-md flex items-center gap-2 w-fit bg-slate-100">
            <span>{props.name}</span>
            <i className="bi-x text-lg"></i>
        </div>

    );
}

function AddTag(props) {
    return (
        <div className="w-11/12 md:w-1/2 flex flex-col mx-auto rounded">
            <input placeholder="Tag name" type="text"
                className="p-3 text-gray-500 bg-white outline-none ss rounded" />
            <div className="flex mt-3  justify-end">
                <button className="bg-sky-600 shadow p-2 text-white px-4 rounded">Add</button>
            </div>
        </div>

    );
}
const _tags = ["programming", "networks", "works"];

function Tags(props) {
    const [tags, setTags] = useState([]);

    useEffect(() => {

        // Fetch data
        setTags(_tags);

    }, [tags]);

    return (
        <div className='flex flex-col gap-4'>
            <AddTag />
            <div className="w-11/12 md:w-3/4 mx-auto mt-16 text-gray-700 text-sm p-2 flex gap-2 flex-wrap">
                {
                    tags.map((tag) => {
                        return (<Tag name="tag" />);
                    })
                }
            </div>
        </div>
    );
}


export { Tags };

