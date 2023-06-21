import React from 'react'
import c from './more.module.scss'

const More = () => {
  const data = JSON.parse(localStorage.getItem('more'))

  return (
    <div className={c.more}>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Кол-во</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {
            data ? 
            data.item.cart.map((item, i) => (
              <tr key={i}>
                <td>{item.title}</td>
                <td>{item.count}</td>
                <td>{item.count * item.price}</td>
              </tr>
            ))
            :
            null
          }
          <tr>
            <td></td>
            <td></td>
            <td>Итого: {data.item.cart.reduce((acc, obj) => acc + Number(obj.price * obj.count), 0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default More