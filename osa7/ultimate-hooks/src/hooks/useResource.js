import { useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((res) => setResources(res.data))
  }

  const create = async (resource) => {
    console.log('aloitetaan')
    const response = await axios.post(baseUrl, resource)
    console.log('valmista')
    console.log(response.data)
    setResources([...resources, response.data])
  }

  const service = {
    create, getAll
  }

  return [
    resources, service
  ]
}
