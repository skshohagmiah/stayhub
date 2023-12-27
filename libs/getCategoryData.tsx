import {
  FaBed,
  FaBath,
  FaWifi,
  FaTv,
  FaParking,
  FaSwimmingPool,
  FaHotTub,
  FaUtensils,
  FaCoffee,
  FaConciergeBell,
  FaMapMarkerAlt,
  FaDog,
  FaChild,
  FaMoneyBillWave,
  FaChair,
  FaStar,
  FaWheelchair,
  FaCar,
} from 'react-icons/fa';


const getCategoryData = () => {
  const hotelCategories = [
    { title: 'Single Bed', icon: <FaBed className='w-8 h-8'/> },
    { title: 'Double Bed', icon: <FaBed className='w-8 h-8'/> },
    { title: 'Bathroom', icon: <FaBath className='w-8 h-8'/> },
    { title: 'Free Wi-Fi', icon: <FaWifi className='w-8 h-8'/> },
    { title: 'TV', icon: <FaTv className='w-8 h-8'/> },
    { title: 'Parking', icon: <FaParking className='w-8 h-8'/> },
    { title: 'Swimming Pool', icon: <FaSwimmingPool className='w-8 h-8'/> },
    { title: 'Hot Tub', icon: <FaHotTub className='w-8 h-8'/> },
    { title: 'Dining', icon: <FaUtensils className='w-8 h-8'/> },
    { title: 'Coffee Maker', icon: <FaCoffee className='w-8 h-8'/> },
    { title: 'Concierge', icon: <FaConciergeBell className='w-8 h-8'/> },
    { title: 'Location', icon: <FaMapMarkerAlt className='w-8 h-8'/> },
    { title: 'Pet Friendly', icon: <FaDog className='w-8 h-8'/> },
    { title: 'Family Friendly', icon: <FaChild className='w-8 h-8'/> },
    { title: 'Affordable', icon: <FaMoneyBillWave className='w-8 h-8' /> },
    { title: 'Comfortable Seating', icon: <FaChair className='w-8 h-8'/> },
    { title: '5-Star Rating', icon: <FaStar className='w-8 h-8'/> },
    { title: 'Wheelchair Accessible', icon: <FaWheelchair className='w-8 h-8'/> },
    { title: 'Car Rental', icon: <FaCar className='w-8 h-8'/> },
  ];
      return hotelCategories
}

export default getCategoryData