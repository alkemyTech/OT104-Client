# Ong Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

The [React Loader Spinner](https://www.npmjs.com/package/react-loader-spinner) was implemented to render a spinner while API requests are being made. This spinner was created in a separate component, and can be imported and rendered from other components when necessary. There is no need to pass any props to the spinner component for it to work properly. For example, you could import it in a different component like this:
~~~
import Spinner from './Spinner/Spinner';

const OtherComponent = () => {
    return(
        <Spinner/>
    );
}

export default OtherComponent;
~~~
## Available Scripts

In the project directory, you can run:

### `yarn start`

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
