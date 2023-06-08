## frontend guidelines
* no semicolons
* all API calls must be from src/api/, so no `fetch` should be called directly in components
* use `REACT_APP_USE_FAKE_API` env variable to toggle between fake and real API
* fake API:
	- is located in `src/api/api.js`, fake() function
	- uses `fakeDB.js` as a database
	- works without backend
	- use `REACT_APP_USE_FAKE_API=true`
* real API:
	- is located in `src/api/realAPI.js`
	- must have the same functions as fake API
	- connects to backend
	- use `REACT_APP_USE_FAKE_API=false`

## backend guidelines

## naming conventions
* use `login` and `register` instead of `sign in` and `sign up`
