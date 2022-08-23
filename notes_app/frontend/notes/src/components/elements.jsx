import './utils.css';

function SimpleButton(props) {
    const classes = "text-white p-2 rounded " +
        (props.accent === 'error' ? "bg-red-600" : "bg-sky-600");
    return (<button style={props.style} className={classes}>{props.children}</button>);
}

function TextField(props) {
    return (
        <label class="flex flex-col gap-1">
            <span>{props.label}</span>
            <input type="text" placeholder={props.placeholder} value={props.value} onChange={props.onChange} className="p-2 rounded-md border focus:border-gray-500 outline-none" />
        </label>
    );
}

function SocialLink(props) {
    return (
        <a href={props.link}>
            <i className={props.icon + " hover:text-gray-700"}></i>
        </a>

    );

}

function CenterBox(props) {
    return (
        <section className="p-6 box-shadow text-gray-600 ss rounded-md  bg-white flex flex-col gap-4 m-4">
            {props.children}
        </section>
    );

}

function FooterBar(props) {
    return (
        <footer
            className="bg-slate-200 w-full p-1 text-gray-500 flex gap-2 justify-center items-center absolute bottom-0 left-0">
            summer 2022 by 0x-m<i className="bi-github text-lg"></i>
        </footer>
    );

}

function FullScreen(props) {
    return (
        <main className="flex justify-center bg-slate-50  h-screen p-4 items-center ">
            {props.children}
        </main>
    );
}

function TextArea(props) {

}


function Loading(props) {
    const style = {
        "width": props.width,
        "height": props.height,
        "borderColor": props.background,
        "borderTopColor": props.foreground
    }
    return (
        <div style={style} className='rounded-full w-20 h-20 border-t-red-300 border-4 border-gray-200 border-t-4 animate-spin'></div>
    );
}

export { SimpleButton, TextArea, TextField, SocialLink, CenterBox, FooterBar, FullScreen }