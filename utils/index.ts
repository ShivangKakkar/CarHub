import { CarProps, FilterProps } from '@/types'

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, limit, model, fuel } = filters
  const headers = {
    'X-Api-Key': process.env.NEXT_PUBLIC_CAR_API_KEY || '',
  }
  console.log(year)
  const url = `https://api.api-ninjas.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&&fuel_type=${fuel}`
  console.log(url)
  const response = await fetch(url, { headers: headers })
  const result = await response.json()
  return result
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50
  const mileageFactor = 0.1
  const ageFactor = 0.05

  const mileageRate = city_mpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  let rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  // USD to INR
  rentalRatePerDay *= 82.86
  // Round to nearest hundred
  rentalRatePerDay = Math.round(rentalRatePerDay / 100) * 100

  return rentalRatePerDay.toFixed(0)
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage')
  const { make, year, model } = car
  url.searchParams.append(
    'customer',
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ''
  )
  url.searchParams.append('make', make)
  url.searchParams.append('modelFamily', model.split(' ')[0])
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', `${year}`)
  url.searchParams.append('angle', `${angle || 'front'}`)

  return url.toString()
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search)

  searchParams.set(type, value)

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`

  return newPathName
}
