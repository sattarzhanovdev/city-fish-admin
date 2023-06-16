import React from 'react'
import { useForm } from 'react-hook-form'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import cls from './add.module.scss'
import { Components } from '../../components/'
import { API } from '../../api'
import { CategoriesList } from '../../utils'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../App'

const Add = () => {
  const [ categories, setCategories ] = React.useState(null)
  const [ category, setCategory ] = React.useState(null)
  const [ ingredientsId, setIngredientsId ] = React.useState(null)
  const [ dep, setDep ] = React.useState(null)
  const [ page, setPage ] = React.useState(1)
  const [ active, setActive ] = React.useState(false)

  const {
    register,
    handleSubmit,
    reset
  } = useForm()

  const Navigate = useNavigate()

  const categoryId = categories?.find(categ => categ.title === category) 
  const productId = localStorage.getItem('productId')
  
  const posted = () => {
    setActive(true)
    setTimeout(() => {
      Navigate('/products/')
      window.location.reload()
    }, 2000)
  }
  
  const uploading = (data) => {	
    console.log(data.file[0].type);
    const storageRef = ref(storage, `${data.file[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, data.file[0]);
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
          API.postProduct(
            {
              title: data.title, 
              desc: data.desc,
              price: data.price,
              category: data.category, 
              image: downloadURL
            }
          )

          posted()
        });
    })
  }



  return (
    <div 
      className={cls.adding}
    >
      <form 
        className={cls.first} 
        onSubmit={handleSubmit(data => uploading(data))}
      >
        <div>
          <p>Название</p>
          <input 
            type="text"
            {...register('title')}
          />
        </div>
        <div>
          <p>Цена</p>
          <input 
            type="text"
            {...register('price')}
          />
        </div>
        <div>
          <p>Категория</p>
          <select
            {...register('category')}
            // onChange={e => setCategory(e.target.value)}
          >
            <option defaultChecked>Выберите</option>
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
            {...register('desc')}
          />
        </div>
        <div>
          <p>Фото</p>
          <input 
            type="file"
            className={cls.file}
            {...register('file')}
            // onChange={e => setFile(e.target.files[0])}
          />
        </div>
          
        <button type='sumbit'>
          Добавить
        </button>
      </form> 

      {active ? <Components.Alert item={{title: 'Успешно', icon: 'success'}} /> : null}
    </div>
  )
}

export default Add