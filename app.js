function init() {
	const checkbox = document.querySelector('#subscribe');
	const emailInput = document.querySelector('#email');
  const firstNameInput = document.querySelector('#firstName');
  const lastNameInput = document.querySelector('#lastName');
  const submitButton = document.querySelector('#submitButton');
  let inputValidator = {
    'firstName': false,
    'lastName': false
  }

	// Toggle element visibility
  // https://gomakethings.com/how-to-show-and-hide-elements-with-vanilla-javascript/
	function toggle(elem) {
		elem.classList.toggle('is-visible');
	};

  function checkEnableButton() {
		// Submit button will only be available when there is more than 1 character in the first and last name input
		// https://stackoverflow.com/a/67961881
		submitButton.disabled = !(
			firstNameInput.value.length > 0 && lastNameInput.value.length > 0
		);
	};

	document.addEventListener('change', (event) => {
		if (event.target !== checkbox) return;

		toggle(emailInput)
	});

  document.addEventListener('input', event => {
    if (event.target === firstNameInput || event.target === lastNameInput) {
      checkEnableButton();
    }

    return;
  })
}

init();