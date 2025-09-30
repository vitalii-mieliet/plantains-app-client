import { Suspense } from 'react';

const withSuspense = (Component) => {
  const WrappedWithSuspense = (props) => {
    return (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    );
  };

  WrappedWithSuspense.displayName = `withSuspense(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedWithSuspense;
};

export default withSuspense;
