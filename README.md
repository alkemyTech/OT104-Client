# Ong Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

The [React Loader Spinner](https://www.npmjs.com/package/react-loader-spinner) was implemented to render a spinner while API requests are being made. This spinner was created in a separate component, and can be imported and rendered from other components when necessary. There is no need to pass any props to the spinner component for it to work properly. For example, you could import it in a different component like this:

```
import Spinner from './Spinner/Spinner';

const OtherComponent = () => {
    return(
        <Spinner/>
    );
}

export default OtherComponent;
```

### Alerts

To be able to view alerts in a standardized way.
An alert service was created.
Using the library: sweetAlert https://www.npmjs.com/package/sweetalert2-react.

Type of Alerts:

1. Confirmation
   Function:  
    alertServiceConfirm(title, confirmButtonText)
   parameters
   • Title a string is passed with the text it will be the explanation of the action to be confirmed (“string”) can use html (“<strong>Seguro</strong> quiere borrar el archivo”)
   • confirmButtonText A string is passed that will be inside the button both in the button of the first alert and in the second confirming the action
   • If this second parameter is not passed by default, the first button will be Confirmar and the second alert will say Hecho. And the second button will be No Confirmar the second alert will say “No se han Hecho Cambios”

2. Error
   Funcion:  
    alertServiceError(title, text)
   parameters
   • Title a string is passed with the text ("string") you can pass html ("<strong> HTML <u> example </u> </strong>")
   • Text a string is passed with the text ("string") you can pass html ("<strong> HTML <u> example </u> </strong>")

3. Information
   Funcion:
   alertServiceInfoTimer(position, icon, title, showConfirmButton, timer)
   parameters
   • Position where will the popup window will be display. Default Center
   options 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'. (“string”).
   • Icon Default Undefined options 'warning', 'error', 'success', 'info', and 'question' (“string”).
   • Title a string is passed with the text ("string") you can pass html ("<strong> HTML <u> example </u> </strong>")
   • ShowConfirmButton default is true.
   If false is set, the confirmation button will not be shown to close the window (Boolean)..
   • Timer default undefined a time is set in milliseconds after which the popup window will close. (number).
   Modo de usarla importar la funcion

import { alertServiceError, alertServiceInfoTimer, alertServiceSimple } from '../Alert/AlertService'

use the function with the described parameters

<button onClick={() => alertServiceInfoTimer('top-end', 'success', "<strong>HTML <u>example</u></strong> <b>bold text</b>", false, 2000)}>alertServiceTimer</button>

In the project directory, you can run:

### `yarn start`

## Available Scripts

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Skeleton Loader`

To use the skeleton loader, first import the component from / skeleton / Skeleton .jsx. When you want to use skeleton, use the <Skeleton/> tag.

Recommendation when rendering and using <Skeleton /> keep the final structure. Example:

```
<Table striped bordered hover className="align-middle">
            <thead>
              <tr>
                <th className="text-center"><Skeleton/></th>
                <th className="text-center"><Skeleton/></th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td className="text-center"><Skeleton/></td>
                  <td className="text-center"><Skeleton/></td>
                </tr>
            </tbody>
          </Table>
```

### Members Form test

[see the file](src/Components/Members/MembersForm.test.js)

- Render title component to check component render success.
- Send form without information to check errors responses.
- Send data & get error to check error in method.
- Send & ok process to check success response.

### Login Test

[see the file](src\Components\Auth\LoginForm.test.js)

LoginForm.js was tested using React Testing and Jest libraries. It was checked that the file renders correctly through verifying the existence of the input labels. It also displays alert messages when the user tries to submit
the form without completing all of its fields. Finally, the test confirms that the user is correctly redirected to
home page after successfully submitting its data through clicking the "Login" button.

### Header Test

[see the file](src\Components\Header\Header.test.js)

Implementation detalis of the test:

- If user isn't logged in show only public and guest links.
- If user is logged in guest links must not appear.
- Backoffice links appear only when admin is logged in.
