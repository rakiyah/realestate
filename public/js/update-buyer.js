const input_buyer_id = document.getElementById('select-buyer')
const input_name = document.getElementById('input-name-update')
const input_email = document.getElementById('input-email-update')
const input_phone = document.getElementById('input-phone-update')
const input_agent = document.getElementById('select-agent-update')

const buyerSelect = document.getElementById('select-buyer')
buyerSelect.addEventListener('change', function() {
    const selected_buyer_id = buyerSelect.value

    fetch(`/buyers/${selected_buyer_id}`)
    .then(response => response.json())
    .then(buyer => {
        input_name.value = buyer.name,
        input_email.value = buyer.email,
        input_phone.value = buyer.phone,
        input_agent.value = buyer.agent_id
    })
})


const updateBuyerForm = document.getElementById('update-buyer-form')

updateBuyerForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const data = {
        buyer_id: input_buyer_id.value,
        name: input_name.value,
        email: input_email.value,
        phone: input_phone.value,
        agent_id: input_agent.value
    }

    const xhttp = new XMLHttpRequest()
    xhttp.open('PUT', '/put-buyer', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // reload page
            location.reload()
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('there was an error with the input')
        }
    }

    xhttp.send(JSON.stringify(data))
})

