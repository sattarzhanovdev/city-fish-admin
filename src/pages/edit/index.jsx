import React from 'react'
import { useForm } from 'react-hook-form'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import cls from './add.module.scss'
import { Components } from '../../components'
import { API } from '../../api'
import { CategoriesList } from '../../utils'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../App'

const Edit = () => {
  const [ product, setProduct ] = React.useState(null)
  const [ active, setActive ] = React.useState(false)

  const [ title, setTitle ] = React.useState('')
  const [ desc, setDesc ] = React.useState('')
  const [ mass, setMass ] = React.useState('')
  const [ category, setCategory ] = React.useState('')
  const [ typeMass, setTypeMass ] = React.useState('')
  const [ image, setImage ] = React.useState(null)
  const [ price, setPrice ] = React.useState('')

  const { id } = useParams()

  const {
    register,
    handleSubmit,
    reset
  } = useForm()

  const Navigate = useNavigate()

  const posted = () => {
    setActive(true)
    setTimeout(() => {
      Navigate('/products/')
      window.location.reload()
    }, 2000)
  }

  React.useEffect(() => {
    API.getProduct(id)
      .then(res => {
        setProduct(res.data)
        setTitle(res.data.title)
        setDesc(res.data.desc)
        setImage(res.data.image)
        setCategory(res.data.category)
        setMass(res.data.mass)
        setPrice(res.data.price)
        setTypeMass(res.data.typeMass)
      })
  }, [])
  
  const uploading = () => {	
    if(image !== product?.image){
      const storageRef = ref(storage, `${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on("state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            API.editProduct(id, 
              {
                title: product?.title === title ? product.title : title,
                desc: product?.desc === desc ? product.desc : desc,
                category: product?.category === category ? product?.category : category,
                price: product?.price === price ? product?.price : price,
                typeMass: product?.typeMass === typeMass ? product?.typeMass : typeMass,
                mass: product?.mass === mass ? product?.mass : mass, 
                image: downloadURL
              }
            ).then(() => {
              posted()
            })

          });
      })
    }else{
      API.editProduct(id, {
        title: product?.title === title ? product.title : title,
        desc: product?.desc === desc ? product.desc : desc,
        category: product?.category === category ? product?.category : category,
        price: product?.price === price ? product?.price : price,
        typeMass: product?.typeMass === typeMass ? product?.typeMass : typeMass,
        mass: product?.mass === mass ? product?.mass : mass, 
        image: product?.image
      })
        .then(() => Navigate('/products/'))
    }


  }



  return (
    <div 
      className={cls.adding}
    >
      <form 
        className={cls.first} 
      >
        <div>
          <p>Название</p>
          <input 
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <p>Цена</p>
          <input 
            type="text"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div>
          <p>Категория</p>
          <select
            {...register('category')}
            value={category}
            onChange={e => setCategory(e.target.value)}
            // onChange={e => setCategory(e.target.value)}
          >
            <option selected>{category}</option>
            {
              CategoriesList?.map((item , i) => (
                <option key={i}>{item.title}</option>
              ))
            }
          </select>
        </div>
        <div>
          <p>Описание</p>
          <input 
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>
        <div className={cls.amount}>
          <p>Вес / количество</p>
          <div className={cls.right}>
            <input 
              type="text"
              value={mass}
              onChange={e => setMass(e.target.value)}
            />
            <select 
              onChange={e => setTypeMass(e.target.value)}
            >
              <option value="" selected>{product?.typeMass}</option>
              <option value="гр">Грамм</option>
              <option value="л">Литр</option>
              <option value="шт">Штук</option>
            </select>
          </div>
        </div>
        <div>
          <p>Фото</p>
          <input 
            type="file"
            className={cls.file}
            onChange={e => setImage(e.target.files[0])}
          />
        </div>

        <div>
          <img src={image} alt="" width={250} />
        </div>
          
        <button onClick={e => {
          e.preventDefault()
          uploading()
        }}>
          Изменить
        </button>
      </form> 

      {active ? <Components.Alert item={{title: 'Успешно', icon: 'success'}} /> : null}
    </div>
  )
}

export default Edit