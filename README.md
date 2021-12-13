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

### Alertas

Para poder visualizar alertas de una forma estandarizada. Se creo un servicio de alertas. Utilizando la librería: sweetAlert https://www.npmjs.com/package/sweetalert2-react.

Alertas de:

1. Confirmación
   Funcion:  
    alertServiceConfirm(title, confirmButtonText)
   parametros
   • Title se pasa un string con el texto sera la explicacion de la accion a confirmar (“string”) se puede pasar html (“Seguro quiere borrar el archivo”)
   • confirmButtonText se pasa un string que estara dentro del boton tanto en el boton del primer alert como en el segundo confirmando la accion
   • si no se pasa este segundo parametro por defecto el primer boton sera Confirmar y el segundo alert dira Hecho. Y esl segundo boton sera No Confirmar el segundo alert dira “No se han Hecho Cambios”

2. Error
   Funcion:  
    alertServiceError(title, text)
   parametros
   • Title se pasa un string con el texto (“string”) se puede pasar html (“<strong>HTML <u>example</u></strong> ”) .
   • Text se pasa un string con el texto (“string”) se puede pasar html (“<strong>HTML <u>example</u></strong> ”) .

3. nformación
   Funcion:
   alertServiceInfoTimer(position, icon, title, showConfirmButton, timer)
   parametros
   • Position donde se ubicara el popup window Default Center
   opciones 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'. (“string”).
   • Icon Default Undefined opciones warning, error, success, info, and question (“string”).
   • Title se pasa un string con el texto (“string”) se puede pasar html (“<strong>HTML <u>example</u></strong> ”) .
   • ShowConfirmButton default es true si se coloca false no se mostrara el boton de fonfirmacion para cerrar la ventana (booleano).
   • Timer default undefined se setea un tiempo en milisegundos al cabo del cual se cerrara la ventana popup. (number).
   Modo de usarla importar la funcion

import { alertServiceError, alertServiceInfoTimer, alertServiceSimple } from '../Alert/AlertService'

usar la funcion con los parametros descriptos

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
