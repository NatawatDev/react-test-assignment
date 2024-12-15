import { render, screen, waitFor } from '@testing-library/react'
import UserProfile from './UserProfile'

global.fetch = jest.fn();

describe('test UserList component', () => {
  // Mock response
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  }

  it('renders loding before API call sucesseds', async () => {    
    render(<UserProfile userId='1'/>)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
  
  it('renders user list successfully when API call sucesseds', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUser,
    });
    render(<UserProfile userId='1'/>)
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Email: john@example.com')).toBeInTheDocument()
    })
  })
})

it('renders error when API response is not ok', async () => {
  fetch.mockResolvedValue({
    ok: false
  })

  render(<UserProfile userId="1" />)

  await waitFor(() => {
    expect(screen.getByText('Error: Failed to fetch user data')).toBeInTheDocument()
  })
})

it('renders error when API call fail', async () => {    
  fetch.mockRejectedValue(new Error('Failed to fetch user data'));

  render(<UserProfile userId='1'/>)

  await waitFor(() => {
    expect(screen.getByText('Error: Failed to fetch user data')).toBeInTheDocument()
  })
})