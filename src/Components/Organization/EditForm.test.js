import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditForm from "./EditForm"

const mockData = {
    name: "Somos Mas",
    shortDescription: "Somos una organización sin fines de lucro",
    facebook_url: "www.facebook.com/somosmas",
    linkedin_url: "www.linkedin.com/in/somosmas",
    instagram_url: "www.instagram.com/somosmas",
    twitter_url: "www.twitter.com/somosmas"
}

test('rendering  edit form', async () => {
    render(<EditForm />)

    const nameLabel = screen.getByLabelText(/nombre/i);
    const logoLabel = screen.getByLabelText(/logo/i);
    const shortDescriptionLabel = screen.getByLabelText(/descripción corta/i);
    const facebookLabel = screen.getByLabelText(/facebook/i);
    const instagramLabel = screen.getByLabelText(/instagram/i);
    const linkedinLabel = screen.getByLabelText(/linkedin/i);
    const twitterLabel = screen.getByLabelText(/twitter/i);
  
    await waitFor(() => {
      expect(nameLabel).toBeInTheDocument();
      expect(logoLabel).toBeInTheDocument();
      expect(shortDescriptionLabel).toBeInTheDocument();
      expect(facebookLabel).toBeInTheDocument();
      expect(instagramLabel).toBeInTheDocument();
      expect(linkedinLabel).toBeInTheDocument();
      expect(twitterLabel).toBeInTheDocument();
    })
  })

  test('data submitting', async () => {
    render(<EditForm />)
    userEvent.click(screen.getByRole("button", {name: /enviar/i}))
  
    await waitFor(() => {
        expect(screen.getAllByText("Requerido")).toBeTruthy();
  })
})

test('correct data submitting returns success message', async () => {
    render(<EditForm />)

    const file = new File(['hello'], 'hello.png', {type: 'image/png'})
    userEvent.type(screen.getByLabelText(/nombre/i), mockData.name)
    userEvent.upload(screen.getByLabelText(/logo/i), file)
    userEvent.type(screen.getByLabelText(/descripción corta/i), mockData.shortDescription)
    userEvent.type(screen.getByLabelText(/facebook/i), mockData.facebook_url)
    userEvent.type(screen.getByLabelText(/twitter/i), mockData.twitter_url)
    userEvent.type(screen.getByLabelText(/linkedin/i), mockData.linkedin_url)
    userEvent.type(screen.getByLabelText(/instagram/i), mockData.instagram_url)
    userEvent.click(screen.getByRole("button", {name: /enviar/i}))

    await waitFor(() => {
        expect(screen.getByText("La información fue creada correctamente")).toBeInTheDocument();
  })
})