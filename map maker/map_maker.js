tab_counter = 1
new_tab_number = 1
max_tab_count = 10

window.onload = () => {
    let map_container = document.getElementById('map_container')
    
}

document.get

function deleteTab(element) {
    let confirm_msg = `Do you want to delete "${element.parentElement.getElementsByClassName('tab_textContent')[0].textContent.trim()}"?`
    if(confirm(confirm_msg)) {
        element.parentElement.remove()
        tab_counter -= 1
    }
    else {
        return 0
    }
}

function addTab() {
    if(tab_counter < max_tab_count) {
        let container = document.getElementById('map_tabs')
    
        let new_tab = document.createElement('div')
        new_tab.setAttribute('class', 'tab')
        new_tab.setAttribute('id', `tab${new_tab_number}`)
        new_tab.innerHTML = `   <div class="tab_textContent">
                                    Empty tab ${new_tab_number}
                                </div>
                                <img src="./textures/UI/delete_tab.png" alt="delete tab" class="delete_tab" onclick="deleteTab(this)">`
    
        container.appendChild(new_tab)
    
        tab_counter += 1
    }
}