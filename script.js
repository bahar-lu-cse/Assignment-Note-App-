const form = document.querySelector('form');
const input = document.getElementById('item');
const btn_del_submit = document.getElementById('submit');
const btn_del_clear = document.getElementById('clear');
const tbl = document.querySelector('table', 'tr', 'td');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));

const entryMaker = (text) => {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.className = "cell";
    const btn_del = document.createElement('button');
    btn_del.className = "btn btn-outline-primary btnCell text-right myOwnBtn-1 float-right";
    tr.appendChild(td);

    btn_del.innerHTML = "Delete";
    btn_del.onclick = function () {
        for (let i = 0; i < tbl.rows.length; i++) {
            if (tbl.rows[i] === tr) {
                itemsArray.splice(i, 1);
                localStorage.setItem('items', JSON.stringify(itemsArray));
                tbl.removeChild(tr);
            }
        }
    };


    td.appendChild(document.createTextNode(text));
    td.appendChild(btn_del);
    tbl.appendChild(tr);
}

itemsArray.forEach(item => {
    entryMaker(item);
});

function submitNewEntry() {
    if (input.value === "" || input.value[0] === " ") {
        input.value = "";
        return;
    }
    itemsArray.push(input.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    entryMaker(input.value);
    input.value = "";
}

btn_del_clear.addEventListener('click', function () {
    localStorage.clear();
    while (tbl.firstChild) {
        tbl.removeChild(tbl.firstChild);
    }
    itemsArray = [];
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitNewEntry();
});

btn_del_submit.addEventListener('click', function () {
    submitNewEntry();
});

