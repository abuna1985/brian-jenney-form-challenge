// wrap everything in a function so variables/functions are not globally available
function init() {
	/* 1. Variable Declarations */
	const happyForm = document.querySelector('#happyForm');
	const firstNameInput = document.querySelector('#firstName');
	const lastNameInput = document.querySelector('#lastName');
	const commentBox = document.querySelector('#comment');
	const checkbox = document.querySelector('#subscribe');
	const emailInput = document.querySelector('#email');
	const submitButton = document.querySelector('#submitButton');
	const message = document.querySelector('#message');

	/* 2. Function Declarations */
	/**
	 * Toggle the visibility on a specified HTML element
	 * https://gomakethings.com/how-to-show-and-hide-elements-with-vanilla-javascript/
	 * @param   {HTMLElement}  elem  The HTML element we want to toggle visibility
	 */
	function toggleVisibility(elem) {
		elem.classList.toggle('is-visible');
	}

	/**
	 * enable submit button when the first and last name inputs have at least 1 character
	 * https://stackoverflow.com/a/67961881
	 */
	function areInputsPopulated() {
		submitButton.disabled = !(
			firstNameInput.value.length > 0 && lastNameInput.value.length > 0
		);
	}

	/**
	 * Get data from the form
	 * @returns {Object}				An object that contains the data from the form fields
	 */
	function getFormData() {
		let formData = {
			firstName: firstNameInput.value,
			lastName: lastNameInput.value,
			comment: commentBox.value,
			isSubscribed: false,
		};
		// if subscribed is checked, update the formData
		if (checkbox.checked) {
			formData.isSubscribed = true;
			formData.email = emailInput.value;
		}

		return formData;
	}

	/**
	 * run a fetch POST request
	 * @param   {String}  url  		 the url that the POST is being sent to
	 * @param   {Object}  formObj  An object that contains the form field data
	 * @returns {Function}         Return the result from the POST fetch request
	 */
	async function postUser(url, formObj) {
		return fetch(url, {
			method: 'POST',
			body: JSON.stringify(formObj),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
	}

	/**
	 * Clear the inputs/checkbox from the happyForm
	 */
	function clearFormFields() {
		firstNameInput.value = '';
		lastNameInput.value = '';
		submitButton.disabled = true;
		// only if comment textarea is populated
		if (commentBox.value.length > 0) {
			commentBox.value = '';
		}
		// only if the checkbox is checked
		if (checkbox.checked) {
			checkbox.checked = false;
		}
		// only if email input is populated
		if (emailInput.value.length > 0) {
			emailInput.value = '';
			emailInput.classList.remove('is-visible');
		}
	}

	/* Event Listeners/executing functions */
	// https://gomakethings.com/listening-for-events-on-multiple-elements-using-javascript-event-delegation/

	document.addEventListener('change', (event) => {
		// if the target is not checkbox, do nothing
		if (event.target !== checkbox) return;

		toggleVisibility(emailInput);
	});

	document.addEventListener('input', (event) => {
		// if the target is the firstName input or lastName input
		if (event.target === firstNameInput || event.target === lastNameInput) {
			areInputsPopulated();
		}
		// else do nothing
		return;
	});

	document.addEventListener('submit', async (event) => {
		// if the target is not the happyForm, do nothing
		if (event.target !== happyForm) return;
		// stop the action default of refreshing
		event.preventDefault();
		let formData = getFormData();
		// wrap async/await in try/catch for error handling
		try {
			let data = await postUser('https://jsonplaceholder.typicode.com/users', formData);
			let status = await data.status;
			// status 200-206: success
			// status 300-308: redirection
			if (status >= 200 && status < 400) {
				message.textContent = `Thanks for the submission ${formData.firstName}!`;
				// clear the form fields
				clearFormFields();
				// remove message after a 2 second delay
				setTimeout(() => message.textContent = '', 2000);
			} else {
				message.textContent = `Oops something went wrong`;
			}
		} catch (e) {
			message.textContent = `Oops something went wrong`;
			console.error(e);
		}
	});
}

//run the init function so the event listeners are added
init();