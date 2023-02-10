import { FC, ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

type Props = {
  element?: ReactNode;
  replacement: ReactNode;
  useCheckAvailable: () => boolean;
};

const ProtectedElement: FC<Props> = ({ element, replacement, useCheckAvailable }) => {
  const isAvailableToRender = useCheckAvailable();
  return isAvailableToRender ? <>{element}</> : <>{replacement}</>;
};

const createProtectedRoutes = (
  routes: RouteObject | RouteObject[],
  replacement?: ReactNode,
  useCheckAvailable?: () => boolean
): RouteObject[] => {
  const isReplacement = replacement && useCheckAvailable instanceof Function;

  return (Array.isArray(routes) ? routes : [routes]).map((route) => {
    return {
      ...route,
      element: isReplacement && (
        <ProtectedElement
          element={route.element}
          replacement={replacement}
          useCheckAvailable={useCheckAvailable}
        />
      ),
    };
  });
};

export default createProtectedRoutes;
