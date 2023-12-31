import React from 'react'
import cls from './products.module.scss'
import { API } from '../../api'
import { useNavigate } from 'react-router-dom'
import { BiEdit, BiTrash } from 'react-icons/bi'

const Products = () => {
  const [ products, setProducts ] = React.useState(null)
  const [ dep, setDep ] = React.useState(null)

  React.useEffect(() => {
    API.getProducts()
      .then(res => {
        const result = Object.entries(res.data)
          .map(([id, item]) => {
            return {
              id: id,
              ...item
            }
          })

        setProducts(result.reverse())
      })
  }, [dep])

  const Navigate = useNavigate()

  const delete_product = (id) => {
    API.deleteProduct(id)
      .then(res => setDep(Math.random()))
  }



  return (
    <div className={cls.addProducts}>
      <div className={cls.up}>
        <h3>Продукты</h3>
        <button
          onClick={() => Navigate('/add')}
        >
          + добавить продукт
        </button>
      </div>
      <div className={cls.down}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className='text-center'>Фото</th>
              <th scope="col" className='text-center'>Название</th>
              <th scope="col" className='text-center'>Категория</th>
              <th scope="col" className='text-center'>Цена</th>
              <th scope="col" className='text-center'>ㅤ</th>
            </tr>
          </thead>
          <tbody>
            {
              products?.length !== 0 ?
              products?.map((item, i) => (
                <tr 
                  key={i}
                  onClick={() => {
                    localStorage.setItem('productsItem', JSON.stringify(item))
                  }}
                >
                  <td className='text-center'>
                    <img src={item.image} alt={item.title} onClick={() => Navigate(`/product/${item.id}`)}/>
                  </td>
                  <td className='text-center'>{item.title}</td>
                  <td className='text-center'>{item.category}</td>
                  <td className='text-center'>{item.price}.00</td>
                  <td 
                    className='text-center' 
                    role={'button'}
                  >
                    <span
                      className='text-danger' 
                      onClick={() => delete_product(item.id)} 
                    >
                      <BiTrash />
                    </span>
                    <span
                      className='text-warning' 
                      onClick={() => Navigate(`/edit/${item.id}/`)} 
                    >
                      <BiEdit />
                    </span>
                  </td>
                </tr>
              )) : 
              <tr>
                <td>Ничего нет</td>
                <td>ㅤ</td>
                <td>ㅤ</td>
                <td>ㅤ</td>
                <td>ㅤ</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products