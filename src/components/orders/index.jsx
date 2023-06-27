import React from 'react'
import { API } from '../../api'
import cls from './orders.module.scss'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
  const [ orders, setOrders ] = React.useState(null)
  const [ dep, setDep ] = React.useState('')
  const [ length, setLen ] = React.useState(0)
  
	// const newSound = new Audio('https://firebasestorage.googleapis.com/v0/b/city-fish.appspot.com/o/success.mp3?alt=media&token=215fb2ee-17ce-4892-8b52-c0bd2840320d')

  const Navigate = useNavigate()

  React.useEffect(() => {
    API.getOrders()
      .then(res => {
        const result = Object.entries(res.data)
          .map(([id, item]) => {
            return {
              id: id, 
              item
            }
          })
        // setOrders(result.reverse())
        // if(result.length !== length){
        //   newSound.play()
        // }
        setTimeout(() => {
          setLen(result?.length)
        }, 2000)
      })

      setTimeout(() => {
        setDep(Math.random())
      }, 10000)
  }, [dep])

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

  const handleDelete = (data) => {
    console.log(data.id);
    API.postDeclinedOrders(data)
      .then(() => {
        API.deleteOrders(data.id)
        .then(() => setDep(Math.random()))
      })
  }

  return (
    <div className={cls.orders}>
      <h3>Список заказов</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col" className='text-center'>Имя</th>
            <th scope="col" className='text-center'>Адрес</th>
            <th scope="col" className='text-center'>Тел-номер</th>
            <th scope="col" className='text-center'>Сумма</th>
            <th scope="col" className='text-center d-flex justify-content-center'>Статус</th>
            <th scope="col" className='text-center'>ㅤ</th>
          </tr>
        </thead>
        <tbody>
          {
            orders?.length !== 0 ?
            orders?.map((item, i) => (
              <tr 
                key={i}
                onClick={() => {
                  localStorage.setItem('more', JSON.stringify(item))
                }}
              >
                <td 
                  onClick={() => {
                    Navigate('/more/')
                  }}
                  className='text-center'
                  
                >{item.id}</td>
                <td className='text-center'>{item.item.name}</td>
                <td className='text-center'>{item.item.address} / {item.item.corpus}кор / {item.item.apart}кв</td>
                <td className='text-center'>{item.item.phone}</td>
                <td className='text-center'>{item.item.cart?.reduce((acc, obj) => acc + Number(obj.price * obj.count), 0)}.00</td>
                <td className='d-flex justify-content-center'>
                  <span className='text-center'>
                    {item.item.status}
                  </span>  
                </td>
                <td className='text-center'>  
                  {
                    item.item.status === 'в ожидании' ?
                    <button 
                      type="button" 
                      className="btn btn-success "
                      onClick={() => take_order(item.id, item.item)}
                    >
                      Принять
                    </button>
                    : item.item.status === 'Принято' ?
                    <button 
                      type="button" 
                      className="btn btn-warning"
                      onClick={() => send_order(item.id, item.item, item)}
                    >
                      Передано
                    </button>
                    : item.item.status === 'отменено' || item.item.status === 'получено' ?
                    <button 
                      type="button" 
                      className="btn btn-danger"
                      onClick={() => delete_order(item.id, item.item.status)}
                    >
                      Удалить
                    </button>
                    :
                    ''
                  }
                </td>
                {
                  item.item.status === 'отменено' ?
                  handleDelete(item.item) :
                  null
                }
              </tr>
            )) : 
            <tr>
              <td>Ничего нет</td>
              <td>ㅤ</td>
              <td>ㅤ</td>
              <td>ㅤ</td>
              <td>ㅤ</td>
              <td>ㅤ</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Orders