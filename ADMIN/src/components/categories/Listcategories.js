import React, { useEffect } from 'react'
import  AfficheCategories  from './AfficheCategories'
import { useDispatch } from 'react-redux'
import { getCategories } from '../../features/categorieSlice'

const Listcategories = () => {
  const dispatch = useDispatch();
useEffect(() => {
dispatch(getCategories());
},[dispatch]);
  return (
    <div>
       <AfficheCategories/>
    </div>
  )
}
export default Listcategories
