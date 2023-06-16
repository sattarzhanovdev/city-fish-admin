import React from 'react'
import c from './statistic.module.scss'
import { API } from '../../api'

const Statistic = () => {
  const [ statistic, setStatistic ] = React.useState(null)

  React.useEffect(() => {
    API.getOrders()
      .then(res => {
        const result = Object.entries(res?.data)
          .map(([item, id]) => {
            return {
              id: id, 
              ...item
            }
          })
        setStatistic(result);
      })
  }, [])

  return (
    <div className={c.container}>
      
    </div>
  )
}

export default Statistic