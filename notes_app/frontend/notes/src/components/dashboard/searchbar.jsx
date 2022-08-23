function SearchBox(props) {
    return (
        <div className="flex gap-2 p-2 items-center group">
            <button onclick="toggleMenu();">
                <i className="bi-list text-2xl md:hidden text-gray-400"></i>
            </button>
            <div className="flex gap-1 text-lg items-center px-4">
                <i className="bi-search group-focus-within:text-gray-600 text-gray-400"></i>
                <input type="text"
                    className="outline-none group-focus-within:text-gray-600 p-2 w-full text-gray-500"
                    placeholder="Search..." />
            </div>
        </div>

    );
}

function Avatar(props) {
    return (
        <div class="flex gap-2 items-center">
            <div class="w-8 h-8 md:h-10 md:w-10 rounded-full border border-gray-400">
                <img src={props.src} class="object-cover rounded-full" alt="" />
            </div>
            <h6 class="text-gray-500 text-sm md:text-lg">{props.username}</h6>
        </div>

    );
}

function Bell(props) {
    return (
        <button className="relative">
            <i className="bi-bell text-gray-500 text-xl md:text-2xl"></i>
            <span className="h-2 w-2 rounded-full bg-red-500 absolute top-0 left-0.5"></span>
        </button>

    );
}


function SearchBar(props) {
    return (
        <nav class="h-16 shadow p-2 flex justify-between bg-white w-full">
            <SearchBox />
            <div className="flex gap-6 items-center px-3">
                <Avatar src={props.avatar} username={props.username} />
                <Bell />
            </div>
        </nav>
    );

}


export { SearchBar }

{
    /*
     <section class="basis-full md:basis-5/6 bg-slate-50 overflow-auto">
                <nav class="h-16 shadow p-2 flex justify-between bg-white w-full"
                    style="box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;">
                    <div class="flex gap-2 p-2 items-center group">
                        <button onclick="toggleMenu();">
                            <i class="bi-list text-2xl md:hidden text-gray-400"></i>
                        </button>
                        <div class="flex gap-1 text-lg items-center px-4">
                            <i class="bi-search group-focus-within:text-gray-600 text-gray-400"></i>
                            <input type="text"
                                class="outline-none group-focus-within:text-gray-600 p-2 w-full text-gray-500"
                                placeholder="Search...">
                        </div>
                    </div>
                    <div class="flex gap-6 items-center px-3">
                        <div class="flex gap-2 items-center">
                            <div class="w-8 h-8 md:h-10 md:w-10 rounded-full border border-gray-400">
                                <img src="https://i.pravatar.cc/300" class="object-cover rounded-full" alt="">
                            </div>
                            <h6 class="text-gray-500 text-sm md:text-lg">Mohammad!</h6>
                        </div>
                        <button class="relative">
                            <i class="bi-bell text-gray-500 text-xl md:text-2xl"></i>
                            <span class="h-2 w-2 rounded-full bg-red-500 absolute top-0 left-0.5"></span>
                        </button>
                    </div>
                </nav>
    */
}
