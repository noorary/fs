import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={addBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'TDD harms architecture'}
  })
  fireEvent.change(author, {
    target: { value: 'Robert C. Martin'}
  })
  fireEvent.change(url, {
    target: { value: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'}
  })

  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('TDD harms architecture')
  expect(addBlog.mock.calls[0][0].author).toBe('Robert C. Martin')
  expect(addBlog.mock.calls[0][0].url).toBe('http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html')
})