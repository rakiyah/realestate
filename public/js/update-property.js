const input_property = document.getElementById('select-address-update')
const input_address = document.getElementById('input-address-update')
const input_lprice = document.getElementById('input-lprice-update')
const input_buyer = document.getElementById('input-buyerid-update')
const input_seller = document.getElementById('input-sellerid-update')
const input_market = document.getElementById('input-market-update')
const input_sell_price = document.getElementById('sell-price-update')
const input_sell_date = document.getElementById('sell-date-update')


const propertySelect = document.getElementById('select-address-update')
propertySelect.addEventListener('change', function() {
    const selected_property_id = propertySelect.value

    fetch(`/properties/${selected_property_id}`)
        .then(response => response.json())
        .then(property => {
            input_address.value = property.address
            input_lprice.value = property.listed_price
            input_buyer.value = property.buyer_id
            input_seller.value = property.seller_id

            // check checkbox if necessary
            input_market.value = property.on_market
            if (property.on_market === 1) {
                input_market.checked = true
            }
            
            
            input_sell_price.value = property.sell_price

            // format date
            const date_portion = property.sell_date.split('T')[0]
            console.log(date_portion)
            input_sell_date.value = date_portion
        })
    
})

const updatePropertyForm = document.getElementById('put-property-form')

updatePropertyForm.addEventListener('submit', function (e) {
    e.preventDefault()


    const data = {
        property_id: input_property.value,
        address: input_address.value,
        lprice: input_lprice.value,
        buyer_id: input_buyer.value,
        seller_id: input_seller.value,
        on_market: input_market.value,
        sell_price: input_sell_price.value,
        sell_date: input_sell_date.value
    }


    const xhttp = new XMLHttpRequest()
    xhttp.open('PUT', '/put-property', true)
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

