import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className='w-full px-3 py-2.5 border border-gray-300 rounded outline-none text-gray-600 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    name={name}
    value={address[name] || ''}
    onChange={handleChange}
    required
  />
)

const AddAddress = () => {
  const { axios, user } = useAppContext()
  const navigate = useNavigate()

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setAddress((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (loading) return

    if (user === null) {
      toast.error('Checking authentication. Please wait.')
      return
    }

    if (user === false) {
      toast.error('Please login to add an address')
      navigate('/')
      return
    }

    const cleanedAddress = Object.fromEntries(
      Object.entries(address).map(([key, value]) => [
        key,
        value.trim()
      ])
    )

    setLoading(true)

    try {
      const { data } = await axios.post(
        '/api/address/add',
        cleanedAddress,
        {
          withCredentials: true
        }
      )

      if (data.success) {
        toast.success(data.message || 'Address added successfully')
        navigate('/cart')
      } else {
        toast.error(data.message || 'Failed to add address')
      }
    } catch (error) {
      console.error('Add address error:', error)

      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        navigate('/')
      } else {
        toast.error(
          error.response?.data?.message ||
          error.message ||
          'Something went wrong'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user === false) {
      navigate('/')
    }
  }, [user, navigate])

  if (user === null) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <p className='text-gray-500'>Checking authentication...</p>
      </div>
    )
  }

  if (user === false) {
    return null
  }

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping{' '}
        <span className='font-semibold text-primary'>
          Address
        </span>
      </p>

      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form
            onSubmit={onSubmitHandler}
            className='space-y-3 mt-6 text-sm'
          >
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                name='firstName'
                type='text'
                placeholder='First Name'
                handleChange={handleChange}
                address={address}
              />

              <InputField
                name='lastName'
                type='text'
                placeholder='Last Name'
                handleChange={handleChange}
                address={address}
              />
            </div>

            <InputField
              name='email'
              type='email'
              placeholder='Email address'
              handleChange={handleChange}
              address={address}
            />

            <InputField
              name='street'
              type='text'
              placeholder='Street'
              handleChange={handleChange}
              address={address}
            />

            <div className='grid grid-cols-2 gap-4'>
              <InputField
                name='city'
                type='text'
                placeholder='City'
                handleChange={handleChange}
                address={address}
              />

              <InputField
                name='state'
                type='text'
                placeholder='State'
                handleChange={handleChange}
                address={address}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <InputField
                name='zipcode'
                type='text'
                placeholder='Zip code'
                handleChange={handleChange}
                address={address}
              />

              <InputField
                name='country'
                type='text'
                placeholder='Country'
                handleChange={handleChange}
                address={address}
              />
            </div>

            <InputField
              name='phone'
              type='tel'
              placeholder='Phone'
              handleChange={handleChange}
              address={address}
            />

            <button
              type='submit'
              disabled={loading || user === null}
              className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Saving...' : 'Save Address'}
            </button>
          </form>
        </div>

        <img
          className='md:mr-16 mb-16 md:mt-0'
          src={assets.add_address_image}
          alt='Add Address'
        />
      </div>
    </div>
  )
}

export default AddAddress