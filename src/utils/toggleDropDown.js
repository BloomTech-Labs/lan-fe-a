export const toggleDropdown = (event) => {
    // click events bubble, so bubble searching for node w/class dropdown-menu
    if (event.currentTarget.classList.contains('dropdown-menu')) {
        // next grab that matching node's children 
        const childElements = event.currentTarget.children

        for (let element of Object.values(childElements)) {
            // if a child element has a class of dropdown-content, make it visible
            if (element.classList.contains('dropdown-content')) {
                element.classList.toggle('hidden')
                element.classList.toggle('visible')

                // add event listener to listen for dimissal click
                document.addEventListener('click', globalClickListener)
            }
        }
    }
}

const globalClickListener = () => {
    // if a menu is visible, hide it
    if (document.querySelector('.visible')) {
        // grab the visible element
        const visibleDropdown = document.querySelector('.visible')
        visibleDropdown.classList.toggle('hidden')
        visibleDropdown.classList.toggle('visible')
    }
    // since the menu is now hidden, remove event listener
    document.removeEventListener('click', globalClickListener)
}