import React from 'react'
import { API } from '../../api'
import c from './success.module.scss'
import { useNavigate } from 'react-router-dom'

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
  
  const Navigate = useNavigate()

  return (
    <div className={c.success}>
      <h2>Успешные заказы</h2>
      {
        successOrders?.length !== 0 ?
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
              successOrders ? 
              successOrders?.map((item, i) => (
                <tr 
                  key={i}
                >
                  <td className='text-center'>{item.item.item.name}</td>
                  <td className='text-center'>{item.item.item.phone}</td>
                  <td className='text-center'>{item.item.item.time}</td>
                  <td className='text-center'>{item.item.item.cart?.reduce((acc, obj) => acc + Number(obj.price * obj.count), 0)}.00</td>
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