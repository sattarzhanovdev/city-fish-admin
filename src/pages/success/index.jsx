import React from 'react'
import { API } from '../../api'
import c from './success.module.scss'

const Success = () => {
  const [successOrders, setSuccessOrders] = React.useState(null)

  React.useEffect(() => {
    localStorage.setItem('moreOrder', JSON.stringify([]))
    API.successOrders()
      .then(res => {
        const result = Object.entries(res.data)
          .map(([id,item]) => {
            return {
              ...item
            }
          })
          
        setSuccessOrders(result.reverse())
      })
  }, [])
  

  return (
    <div className={c.success}>
      <h2>Успешные заказы</h2>
      {
        successOrders?.length !== 0 ?
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th className='text-center'>Тел-номер</th>
              <th className='text-center'>Время</th>
            </tr>
          </thead>
          <tbody>
            {
              successOrders ? 
              successOrders?.map((item, i) => (
                <tr 
                  key={i}
                  onClick={() => {
                    localStorage.clear('moreOrder')
                    const local = []
                    item.item.cart.map(data => {
                      local.push(data)
                      localStorage.setItem('moreOrder', JSON.stringify(local))
                    })
                  }}
                >
                  <td>{item.item.name}</td>
                  <td className='text-center'>{item.item.phone}</td>
                  <td className='text-center'>{item.item.time}</td>
                </tr>
              ))
              :
              null
            }
          </tbody>
        </table>
        : 
        <tr>
          <th>Ничего нету</th>
          <th>ㅤ</th>
          <th>ㅤ</th>
          <th>ㅤ</th>
        </tr>
      }
    </div>
  )
}

export default Success