import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Carts from './pages/Carts';
import Checkout from './pages/Checkout';
import Contact from './pages/navigation/Contact';
import Confirmation from './pages/Confirmation';
import BridalBooking from './pages/Bridalservies';
import Photoshoot from './pages/PhotoshootBooking';
import SalonArtistBooking from './pages/SalonArtistBooking';
import Services from './pages/Services';
import OnlineAppointment from './pages/OnlineAppointment';
import PaymentPage from './pages/PaymentPage';
import ProductPayment from './pages/ProductPayment';
import ForgetPassword from './pages/ForgetPassword';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/forgetpassword', element: <ForgetPassword /> },
  { path: '/cart', element: <Carts />, protected: true },
  { path: '/checkout', element: <Checkout />, protected: true },
  { path: '/contact', element: <Contact /> },
  { path: '/confirmation', element: <Confirmation />, protected: true },
  { path: '/services/bridal', element: <BridalBooking />, protected: true },
  { path: '/services/photoshoot', element: <Photoshoot />, protected: true },
  { path: '/services/book-artist', element: <SalonArtistBooking />, protected: true },
  { path: '/services', element: <Services />, protected: true },
  { path: '/services/online-appointment', element: <OnlineAppointment />, protected: true },
  { path: '/payment', element: <PaymentPage />, protected: true },
  { path: '/product/payment', element: <ProductPayment />, protected: true },
];

export default routes;
