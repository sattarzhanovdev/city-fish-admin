import React from 'react'
import c from './more.module.scss'
import { API } from '../../api'

const More = () => {
  const data = JSON.parse(localStorage.getItem('more'))
  const [ dep, setDep ] = React.useState('')

  const take_order = (id, item) => {
    API.setOrdersStatus(id, {id: id, ...item, status: 'Принято'})
      .then(() => setDep(Math.random()))
  }

  const delete_order = (id, status) => {
    API.deleteOrders(id,)
      .then(() => setDep(Math.random()))
  }

  const send_order = (id, item, data) => {
    API.setOrdersStatus(id, {id: id, ...item, status: 'Передано курьеру'})
      .then(() => {
        API.postSuccessOrders(data)
        setDep(Math.random())
      })
  }

  const handlePrint = () => window.print()

  return (
    <div className={c.more}>
      <table  className='d-flex w-30' style={{width: '18.6%'}} > 
        <tbody>
          {
            <tr className='d-flex flex-column w-30 align-items-center'>
                <td className='text-center'><span>ID: </span> {data.id}</td>
                <td className='text-center'><span>Имя: </span> {data.item.name}</td>
                <td className='text-center'><span>Адрес: </span> {data.item.address}</td>
                <td className='text-center'><span>Корпус: </span> {data.item.corpus}</td>
                <td className='text-center'>Этаж:  {data.item.floor}</td>
                <td className='text-center'><span>Квартира: </span>  {data.item.apart}</td>
                <td className='text-center'><span>Тел-номер: </span> {data.item.phone}</td>
                <td className='text-center'>Сумма:  {data.item.cart?.reduce((acc, obj) => acc + Number(obj.price * obj.count), 0)}.00</td>
            </tr>
          }
        </tbody>
      </table>
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
      <h3>Комментарий</h3>
      <p>
        {data?.item?.comment}
      </p>
      <div className={c.print}>
        <button onClick={handlePrint}>
          Печать
        </button>
      </div>
    </div>
  )
}

export default More