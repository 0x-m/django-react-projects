function toggleMenu(e) {
    const menu = document.getElementById('menu');
    event.stopPropagation();
    menu.classList.toggle('onshow');
}

function showModal() {
    const modal = document.getElementById('add-modal');
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
}

function hideModal() {
    const modal = document.getElementById('add-modal');
    form = modal.querySelector('#the-form');
    form.reset();
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    const delete_btn = document.getElementById('delete-btn');
    delete_btn.classList.add('hidden');


}

function editNote() {
    const selected_note = event.currentTarget;
    const note_id = selected_note.dataset['noteid'];
    const [title, body, tags] =
        selected_note.querySelectorAll('[name="title"],[name="body"], [name="tags"]');
    const modal = document.getElementById('add-modal');
    const [note_id_input, modal_title, modal_body, modal_tags] =
        modal.querySelectorAll('[name="title"],[name="body"], [name="tags"], [name="note_id"]');
    console.log(modal_title, modal_body, modal_tags, note_id_input);
    modal_title.value = title.innerText;
    modal_body.value = body.innerText;
    note_id_input.value = note_id

    const tags_ids = Array.from(tags.getElementsByTagName('span'))
        .map((item) => parseInt(item.dataset['tagid']));

    Array.from(modal_tags.getElementsByTagName('input')).forEach(
        (item) => {
            if (tags_ids.indexOf(parseInt(item.value)) >= 0) {
                item.checked = true;
            }
        });
    const delete_btn = document.getElementById('delete-btn');
    delete_btn.classList.remove('hidden');
    showModal();
}