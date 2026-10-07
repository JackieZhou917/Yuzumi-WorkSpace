import React from 'react'

export default function Item() {
  const name = '猪猪侠'
  const songs = [
    {id:1, name: '坏女孩'},
    {id:2, name: '你是对的人'},
    {id:3, name: '你好'}
  ]

  return (
    <div>
      <h3>{name}</h3>

      <ul>
        {
          songs.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  )
}
