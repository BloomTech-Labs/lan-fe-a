export const toggleDropdown = (event) => {
  // first, hide any visible menu
  const visibleElement = document.querySelector('.visible');
  if (visibleElement) {
    visibleElement.classList.add('hidden');
    visibleElement.classList.remove('visible');
  }

  // next, locate which dropdown element the event was bubbled to
  if (event.currentTarget.classList.contains('dropdown-menu')) {
    // grab that element's children
    const childElements = event.target.parentElement.children;

    for (let element of Object.values(childElements)) {
      // if a child element has a class of dropdown-content, make it visible
      if (element.classList.contains('dropdown-content')) {
        element.classList.add('visible');
        element.classList.remove('hidden');

        // add event listener to listen for dimissal click
        document.addEventListener('click', globalClickListener);
        break;
      }
    }
  }
};

const globalClickListener = (event) => {
  // case 1: the dismissal click was on another dropdown element (or bubbled to a dropdown element)
  if (
    event.target.classList.contains('dropdown-menu') ||
    event.target.parentElement.classList.contains('dropdown-menu')
  ) {
    // do nothing.
    // the onClick handler will hide the correct dropdown
    return null;
  }

  // case 2: the dismissal click was NOT on another dropdown element
  const visibleElement = document.querySelector('.visible');
  if (visibleElement) {
    visibleElement.classList.add('hidden');
    visibleElement.classList.remove('visible');
  } else {
    // do nothing.
    // visibleElement is null if user's click loads a new page
  }

  // finally, remove event listener
  document.removeEventListener('click', globalClickListener);
};
