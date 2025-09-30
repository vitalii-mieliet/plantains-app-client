import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AppToastContainer.css';

const BounceUp = cssTransition({
  enter: 'toast-bounce-in',
  exit: 'toast-bounce-out',
  duration: [350, 250],
});

// // свг
// const SuccessIcon = (
//   <svg
//     className="toast-icon toast-success-icon"
//     viewBox="0 0 20 20"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     aria-hidden="true"
//   >
//     <path d="M5 10l4 4L15 7" />
//   </svg>
// );

// const ErrorIcon = (
//   <svg
//     className="toast-icon toast-error-icon"
//     viewBox="0 0 20 20"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     aria-hidden="true"
//   >
//     <line x1="5" y1="5" x2="15" y2="15" />
//     <line x1="15" y1="5" x2="5" y2="15" />
//   </svg>
// );

// // хелпери для визову
// export const showSuccessToast = (message) =>
//   toast.success(message, {
//     icon: SuccessIcon,
//     role: 'status',
//   });

// export const showErrorToast = (message) =>
//   toast.error(message, { icon: ErrorIcon, autoClose: 3000, role: 'alert' });

// контейнер тосту
function AppToastContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      closeOnClick
      transition={BounceUp}
      pauseOnHover={false}
      draggable
      newestOnTop
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
      aria-live="polite"
      aria-atomic="true"
    />
  );
}

export default AppToastContainer;
