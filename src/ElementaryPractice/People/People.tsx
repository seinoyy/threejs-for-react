import { useEffect, useState } from 'react'

const People = () => {
  const [people, setPeople] = useState<any[]>([])

  useEffect(() => {
    const getPeople = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      setPeople(data)
    }
    getPeople()
  }, [])

  const nameList = people.map(person => <li key={person.id}>{person.name}</li>)

  return (
    <div>
      <h2>People</h2>
      <ul>{nameList}</ul>
    </div>
  )
}

export default People
