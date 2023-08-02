const updateBuyerForm = document.getElementById('update-buyer-form')

updateBuyerForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const input_name = document.getElementById('select-buyer')
    const input_email = document.getElementById('input-email-update')
    const input_phone = document.getElementById('input-phone-update')
    const input_agent = document.getElementById('select-agent')

    const input_name_value = input_name.value
    const input_email_value = input_email.value
    const input_phone_value = input_phone.value
    const input_agent_value = input_agent.value

    const data = {
        name: input_name_value,
        email: input_email_value,
        phone: input_phone_value,
        agent_id: input_agent_value
    }

    const xhttp = new XMLHttpRequest()
    xhttp.open('PUT', '/put-buyer', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, input_name_value)
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('there was an error with the input')
        }
    }

    xhttp.send(JSON.stringify(data))
})

function updateRow(data, buyer_id) {
    const parsed_data = JSON.parse(data)

    const table = document.getElementById('buyers-table')

    for (let i = 0, row; row=table.rows[i]; i++) {
        if (table.rows[i].getAttribute('data-value') == buyer_id) {
            const update_row_index = table.getElementsByTagName('tr')[i]

            const tds = update_row_index.getElementsByTagName('td')
            tds[1].innerText = parsed_data.email
            tds[2].innerText = parsed_data.phone
            tds[3].innerText = parsed_data.agent_id

            break
        }
    }
}