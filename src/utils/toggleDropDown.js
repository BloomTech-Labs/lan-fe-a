export const toggleDropdown = (event) => {
    // if e.target has a parent with class of dropdown-menu
    // (looking at parent because onClick handler is on a child)
    if (event.target.parentElement.classList.contains('dropdown-menu')) {
        // grab all children
        const childElements = event.target.parentElement.children

        // if a child element has a class of dropdown-content, toggle it
        for (let element of Object.values(childElements)) {
            if (element.classList.contains('dropdown-content')) {
                // toggle its hidden & visible classes
                element.classList.toggle('hidden')
                element.classList.toggle('visible')

                // add event listener to listen for dimissal click
                document.addEventListener('click', globalClickListener)
            }
        }
    }
}

const globalClickListener = (event) => {
    // if a menu is visible, hide it
    if (document.querySelector('.visible')) {
        // grab the visible element
        const visibleDropdown = document.querySelector('.visible')
        // toggle its hidden & visible classes
        visibleDropdown.classList.toggle('hidden')
        visibleDropdown.classList.toggle('visible')
    }
    // since the menu is now hidden, remove event listener
    document.removeEventListener('click', globalClickListener)
}