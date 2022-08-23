import { Link } from 'react-router-dom';

function SidebarItem(props) {
    return (
        <Link to={props.to} className="p-1 flex gap-2">
            <i className={props.icon}></i>
            <span>{props.title}</span>
        </Link>
    );
}

function Sidebar(props) {
    return (

        <section id="menu"
            className="absolute w-0 transition-all overflow-hidden h-screen top-0 left-0 md:relative  flex md:basis-1/6 bg-sky-600  flex-col justify-between gap-2">
            <button className="md:hidden cursor-pointer" onclick="toggleMenu();">
                <i className="bi-x text-white absolute right-1 top-1 text-2xl"></i>
            </button>
            <h1 className="p-4 hidden md:block text-center text-white bg-gray-700 text-2xl">NOTES</h1>
            <div className="flex flex-col w-full p-8 text-white font-extrabold text-lg gap-2">
                <SidebarItem to="notes" title="Notes" icon="bi-table" />
                <SidebarItem to="tags" title="Tags" icon="bi-tags-fill" />
                <SidebarItem to="events" title="Events" icon="bi-stopwatch-fill" />
                <SidebarItem to="profile" title="Profile" icon="bi-person-fill" />
                <SidebarItem to="logout" title="Logout" icon="bi-x-circle-fill" />

            </div>
            <ul className="p-2 flex justify-center items-center gap-4 text-white text-lg">
                <i className="bi-facebook"></i>
                <i className="bi-twitter"></i>
                <i className="bi-github"></i>
                <i className="bi-google"></i>
            </ul>

        </section>

    );

}


export { Sidebar, SidebarItem };

