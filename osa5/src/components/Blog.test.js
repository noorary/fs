import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  let component

  const blog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 16,
    user: {
      name: 'Noora R',
      username: 'noorar'
    }
  }

  test('renders only title and author by default', () => {


    component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'TDD harms architecture'
    )

    expect(component.container).toHaveTextContent(
      'Robert C. Martin'
    )

    expect(component.container).not.toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
    )
  })

  test('clicking like button twice calls event handler twice', () => {
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} handleLike={mockHandler} user={blog.user}/>
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})


