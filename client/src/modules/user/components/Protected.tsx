import { Navigate, Outlet} from 'react-router-dom';
import { ROUTES } from '../../../routes/routeslinks';


const Protected = ({user}) => {
  return user?<Outlet />:<Navigate to={ROUTES.LOGIN} />
}

export default Protected