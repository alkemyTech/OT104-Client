import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ActivitiesForm from './ActivitiesForm';
import userEvent from '@testing-library/user-event'
import {
    createActivity,
    updateActivity,
    getActivity
} from "./__mocks__/activitiesService";

it("the form fields are rendered empty when the url has no id parameter", async () => {
    render(<ActivitiesForm 
        match={{params:{}}}
        mockGetActivity={getActivity}
        mockUpdateActivity={updateActivity}
        mockCreateActivity={createActivity}
    />);
    const inputName = await screen.findByTestId("name")
    const inputImage = await screen.findByTestId("image")
    expect(inputName).toHaveValue("");
    expect(inputImage).toHaveValue("");
})

it("the form fields's content match the corresponding activity property's content when the url has id parameter", () => {
    render(<ActivitiesForm 
        match={{params:{id:"932"}}} 
        test={true} 
        mockGetActivity={getActivity}
        mockUpdateActivity={updateActivity}
        mockCreateActivity={createActivity}
    />);
    const actualName = "Apoyo Escolar para el nivel Primario";
    waitFor( async () => {
        expect(getActivity).toBeCalled()
        const inputName = await screen.findByTestId("name");
        expect(inputName).toHaveValue(actualName)
    })
})

it("doesn't allow a submit when form fields aren't completed correctly.", async () => {
    const mockSubmit = jest.fn();
    render(<ActivitiesForm 
                match={{params:{}}} 
                test={true} 
                mockSubmit={mockSubmit}
                mockGetActivity={getActivity}
                mockUpdateActivity={updateActivity}
                mockCreateActivity={createActivity}
            />);
    const submitButton = await screen.findByText("Enviar")
    fireEvent.click(submitButton);
    expect(mockSubmit).not.toBeCalled();
    const errorName = await screen.findByText("Por favor, ingrese un nombre.");
    const errorImage = await screen.findByText("Por favor, ingrese una imagen.")
    expect(errorImage).toBeInTheDocument();
    expect(errorName).toBeInTheDocument();
})

it("calls the createActivity service and gets the correct alert message when the form is filled correctly.", () => {
    const imageFile = new File(['hello'], 'hello.png', {type: 'image/png'})
    render(<ActivitiesForm 
                match={{params:{}}} 
                test={true} 
                mockGetActivity={getActivity}
                mockUpdateActivity={updateActivity}
                mockCreateActivity={createActivity}
            />);
    waitFor(async () => {
        const submitButton = screen.findByText("Enviar");
        const inputName = screen.findByTestId("name");
        const inputImage = screen.findByTestId("image");
        userEvent.type(inputName, "Prueba X");
        userEvent.upload(inputImage, imageFile);
        userEvent.click(submitButton)
        expect(createActivity).toBeCalled();
        const createdMessage = screen.findByText("Actividad creada satisfactoriamente.")
        expect(createdMessage).toBeInTheDocument()
    })
})

 it("calls the createActivity service and gets error alert message when the form is not filled correctly.", () => {
    render(<ActivitiesForm 
                match={{params:{}}} 
                test={true} 
                mockGetActivity={getActivity}
                mockUpdateActivity={updateActivity}
                mockCreateActivity={createActivity}
            />);
    waitFor(async() => {
        const submitButton = await screen.findByText("Enviar");
        const inputName = await screen.findByTestId("name");
        userEvent.type(inputName, "Prueba X");
        userEvent.click(submitButton)
        expect(createActivity).toBeCalled();
        const createdMessage = await screen.findByText("No se pudo crear la actividad. Hubo un error.")
        expect(createdMessage).toBeInTheDocument()
    })
})

 it("calls the updateActivity service and gets the correct alert message when the form is filled correctly.", () => {
    const imageFile = new File(['hello'], 'hello.png', {type: 'image/png'})
    render(<ActivitiesForm 
                match={{params:{ id: "932"}}} 
                test={true} 
                mockGetActivity={getActivity}
                mockUpdateActivity={updateActivity}
                mockCreateActivity={createActivity}
            />);
    waitFor(async () => {
        const submitButton = await screen.findByText("Enviar");
        const inputName = await screen.findByTestId("name");
        const inputImage = await screen.findByTestId("image");
        userEvent.type(inputName, "Prueba X");
        userEvent.upload(inputImage, imageFile);
        userEvent.click(submitButton)
        expect(updateActivity).toBeCalled();
        const createdMessage = await screen.findByText("Actividad modificada satisfactoriamente.")
        expect(createdMessage).toBeInTheDocument()
    }) 
})

it("calls the updateActivity service and gets error alert message when the form is not filled correctly.", () => {
    render(<ActivitiesForm 
                match={{params:{ id: "932" }}} 
                test={true} 
                mockGetActivity={getActivity}
                mockUpdateActivity={updateActivity}
                mockCreateActivity={createActivity}
            />);
    waitFor( async () => {
        const submitButton = await screen.findByText("Enviar");
        const inputName = await screen.findByTestId("name");
        userEvent.type(inputName, "Prueba X");
        userEvent.click(submitButton)
        expect(updateActivity).toBeCalled();
        const createdMessage = await screen.findByText("No se pudo modificar la actividad. Hubo un error.")
        expect(createdMessage).toBeInTheDocument()
    })    
})