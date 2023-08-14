const input_seller_id = document.getElementById('select-seller')
const input_name = document.getElementById('input-name-update')
const input_email = document.getElementById('input-email-update')
const input_phone = document.getElementById('input-phone-update')
const input_agent = document.getElementById('select-agent-update')

const sellerSelect = document.getElementById('select-seller')
sellerSelect.addEventListener('change', function() {
    const selected_seller_id = sellerSelect.value

    fetch(`/sellers/${selected_seller_id}`)
        .then(response => response.json())
        .then(seller => {
            input_name.value = seller.name,
            input_email.value = seller.email,
            input_phone.value = seller.phone
            input_agent.value = seller.agent_id
        })
})


const updateSellerForm = document.getElementById('update-seller-form')

updateSellerForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const data = {
        seller_id: input_seller_id.value,
        name: input_name.value,
        email: input_email.value,
        phone: input_phone.value,
        agent_id: input_agent.value
    }

    const xhttp = new XMLHttpRequest()
    xhttp.open('PUT', '/put-seller', true)
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

