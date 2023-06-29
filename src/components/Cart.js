import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { remove } from '../Redux/Reduser/Reducer';

export default function Cart() {
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [meal, setMeal] = useState([])
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        const food = response.data.categories;
        setMeal(food);
        // setMeal(food.map((item) => console.log(item)));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])
  // console.log(meal.map((id)=>id.strCategory));
  // console.log(items.map((item) => item));
  return (
    <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div class="pointer-events-auto w-screen max-w-md">
              <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                    <div class="ml-3 flex h-7 items-center">
                      <button onClick={goBack} type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Close panel</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {items.map((item) => {
                    return (<div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          <li class="flex py-6">
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img src={item.strMealThumb} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center" />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="#">{item.strMeal}</a>
                                  </h3>
                                  <p class="ml-4">₹{item.idMeal.slice(2, 4)}.00</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">{item.strCategory}</p>
                              </div>
                              <div class="flex flex-1 items-end justify-between text-sm">
                                <p class="text-gray-500">Qty 1</p>

                                <div class="flex">
                                  <button onClick={handleRemove(item.idMeal)} type="button" class="font-medium text-red-600 hover:text-red-500">Remove</button>
                                </div>
                              </div>
                            </div>
                          </li>
                          {/* 
                          <li class="flex py-6">
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg" alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." class="h-full w-full object-cover object-center" />
                            </div>

                           <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="#">Medium Stuff Satchel</a>
                                  </h3>
                                  <p class="ml-4">$32.00</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">Blue</p>
                              </div>
                              <div class="flex flex-1 items-end justify-between text-sm">
                                <p class="text-gray-500">Qty 1</p>

                                <div class="flex">
                                  <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                </div>
                              </div>
                            </div> 
                          </li>*/}
                        </ul>
                      </div>
                    </div>
                    )
                  })}

                </div>

                <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$262.00</p>
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div class="mt-6">
                    <Link to='/checkout' class="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700">Checkout</Link>
                  </div>
                  <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p >
                      <div>
                        or
                      </div>
                      <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}