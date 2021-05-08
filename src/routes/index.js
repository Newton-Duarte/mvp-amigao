import { Redirect, Switch, Route } from 'react-router-dom';
import { routes } from './config';

export function Routes() {
  const renderRoutes = routes.map(route => (
    <Route key={route.name} {...route} />
  ))

  return (
    <Switch>
      {renderRoutes}
      <Redirect to="/" />
    </Switch>
  )
}