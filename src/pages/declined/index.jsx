import React from 'react'
import { API } from '../../api'
import cls from './declined.module.scss'

const Declined = () => {
  const [successOrders, setSuccessOrders] = React.useState(null)

  React.useEffect(() => {
    localStorage.setItem('moreOrder', JSON.stringify([]))
    API.declinedOrders()
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
    <div className={cls.declined}>
      <h2>Отмененные заказы</h2>
      <table>
        <thead>
          <tr>
            <th className='text-center'>Имя</th>
            <th className='text-center'>Тел-номер</th>
            <th className='text-center'>Время</th>
            <th className='text-center'>Сумма</th>
          </tr>
        </thead>
        <tbody>
        {
          successOrders?.length !== 0 ?
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
              <td className='text-center'>{item.name}</td>
              <td className='text-center'>{item.phone}</td>
              <td className='text-center'>{item.time}</td>
              <td className='text-center'>{item.item.cart?.reduce((acc, obj) => acc + Number(obj.price * obj.count), 0)}.00</td>
            </tr>
          ))
          :
          <tr>
            <th>Ничего нету</th>
            <th>ㅤ</th>
            <th>ㅤ</th>
          </tr>
        }
        </tbody>
      </table>
    </div>
  )
}

export default Declined