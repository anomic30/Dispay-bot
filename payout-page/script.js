const URL = "http://localhost:3000/data";
const otherParam = {
    headers: {
        "content-type":"application/json; charset=UTF-8"
    },
    method:"GET"
}

let result;

window.onload = () => {
    fetch(URL, otherParam).then(data => {
        return data.json()
    }).then(res => {
        result = res;
        console.log(result);
    }).then(() => {
        const amt = document.getElementById('amt');
        const desc = document.getElementById('desc');
        const to = document.getElementById('to');
        const from = document.getElementById('from');
        const refId = document.getElementById('refId');
        const email = document.getElementById('email');
        amt.innerHTML = "₹ "+result.amount;
        desc.innerHTML = result.description;
        to.innerHTML = result.contact.name;
        from.innerHTML = result.from;
        refId.innerHTML = result.id;
        email.innerHTML = result.contact.email;
    })
}