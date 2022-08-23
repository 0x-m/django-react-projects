function Sidebar(props) {
    return (
        <section id="menu"
            class="absolute w-0 transition-all overflow-hidden h-screen top-0 left-0 md:relative  flex md:basis-1/6 bg-sky-600  flex-col justify-between gap-2">
            <button class="md:hidden cursor-pointer" onclick="toggleMenu();">
                <i class="bi-x text-white absolute right-1 top-1 text-2xl"></i>
            </button>
            <h1 class="p-4 hidden md:block text-center text-white bg-gray-700 text-2xl">NOTES</h1>
            <div class="flex flex-col w-full p-8 text-white font-extrabold text-lg gap-2">
                {props.children}
            </div>
            <ul class="p-2 flex justify-center items-center gap-4 text-white text-lg">
                <i class="bi-facebook"></i>
                <i class="bi-twitter"></i>
                <i class="bi-github"></i>
                <i class="bi-google"></i>
            </ul>
        </section>
    );

}

function SidbarItem(props) {
    return (
        <div class="p-1 flex gap-2">
            <i className={props.icon}></i>
            <span>{props.title}</span>
        </div>
    );

}

