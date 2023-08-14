const input_agent = document.getElementById('select-agent')
const input_name = document.getElementById('input-name-update')
const input_email = document.getElementById('input-email-update')
const input_phone = document.getElementById('input-phone-update')

const agentSelect = document.getElementById('select-agent')
agentSelect.addEventListener('change', function() {
    const selected_agent_id = agentSelect.value

    fetch(`/agents/${selected_agent_id}`)
        .then(response => response.json())
        .then(agent => {
            input_name.value = agent.name,
            input_email.value = agent.email,
            input_phone.value = agent.phone
        })
})


const updateAgentForm = document.getElementById('update-agent-form')

updateAgentForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const data = {
        agent_id: input_agent.value,
        name: input_name.value,
        email: input_email.value,
        phone: input_phone.value
    }
    const xhttp = new XMLHttpRequest()
    xhttp.open('PUT', '/put-agent', true)
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
