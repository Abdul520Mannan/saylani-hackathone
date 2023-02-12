import React, { useEffect, useState } from 'react'
import AdminHome from './Home'

import Footer from '../../components/footer';
import Header from '../../components/header';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import Setting from './Setting';
import { collection, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firestore';
import AdminOrder from './Order';

export default function Index() {
    const navigate = useNavigate();
    const [page, setPage] = useState();
  const [products, setProducts] = useState();

    const handleChangePage = (id) => {
        // console.log(id)
        if (id === '/') {
            setPage('/')
            navigate('/admin/home');
        } else if (id === '/admin/product') {
            setPage('/admin/product')
            navigate('/admin/product');
        } else if (id === '/admin/order') {
            setPage('/admin/orders')
            navigate('/admin/orders');
        } else {
            setPage('/admin/setting')
            navigate('/admin/setting');
        }
    }
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "products"), orderBy('created', 'desc'));
        let data = [];
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            data.push(doc.data())
        });
        // console.log(data);
        setProducts(data);
    }
    useEffect(() => {
        getData()
        console.log(products);
    }, [])
    return (

        <div className='main'>
            <div>
                <Header />
                {
                    page === '/'  ?
                    <><AdminHome products={products}/>
                    </>
                         :
                        page === '/admin/product' ?
                            <Product /> :
                            page === '/admin/setting' ? <Setting /> : 
                            page==='/admin/orders'? <AdminOrder />:  <></>
                }
            </div>
            <Footer handleChangePage={handleChangePage} />
        </div>
    )
}
