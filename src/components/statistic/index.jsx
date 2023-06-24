import React from 'react'
import c from './statistic.module.scss'
import { API } from '../../api'
import { TiShoppingCart, TiTick } from 'react-icons/ti'
import { AiOutlineClose } from 'react-icons/ai'

const Statistic = () => {
  const [ orders, setOrders ] = React.useState(null)
  const [ success, setSuccess ] = React.useState(null)
  const [ declined, setDeclined ] = React.useState(null)

  React.useEffect(() => {
    API.getOrders()
      .then(res => {
        if(res.data){
          const result = Object.entries(res?.data)
          .map(([item, id]) => {
            return {
              id: id, 
              ...item
            }
          })
        setOrders(result);
        }
      })
    API.successOrders()
      .then(res => {
        if(res.data){
          const result = Object.entries(res?.data)
            .map(([item, id]) => {
              return {
                id: id, 
                ...item
              }
            })
          setSuccess(result);
        }
      })
    API.declinedOrders()
      .then(res => {
        if(res.data){
          const result = Object.entries(res?.data)
          .map(([item, id]) => {
            return {
              id: id, 
              ...item
            }
          })
        setDeclined(result);
        }
      })
  }, [])


  return (
    <div className={c.container}>
      <div className={c.statistic}>
        <div className={c.card}>
          <div className={c.left}>
            <li>
              <TiShoppingCart />
            </li>
          </div>
          <div className={c.right}>
            <h3>Заказов сейчас</h3>
            <h3>{orders ? orders.length : 0}</h3>
          </div>
        </div>
        <div className={c.card}>
          <div className={c.left}>
            <li>
              <TiTick />
            </li>
          </div>
          <div className={c.right}>
            <h3>Успешных заказов</h3>
            <h3>{success ? success.length : 0}</h3>
          </div>
        </div>
        <div className={c.card}>
          <div className={c.left}>
            <li>
              <AiOutlineClose />
            </li>
          </div>
          <div className={c.right}>
            <h3>Отмененных заказов</h3>
            <h3>{declined ? declined.length : 0}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistic