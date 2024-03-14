// import React from 'react';
// import './index.css';
// import { Link } from 'react-router-dom';

// export default function Button({ text, onClick, to }) {
//   const isHtmlEntity = text.startsWith("&");

//   if (to) {
//     return (
//       <Link to={to}>
//         <button
//           className="button uppercase tracking-widest whitespace-normal"
//           onClick={onClick}
//         >
//           {isHtmlEntity ? (
//             <span className='text-center pl-1 cursor-grab' dangerouslySetInnerHTML={{ __html: text }} />
//           ) : (
//             text
//           )}
//         </button>
//       </Link>
//     );
//   } else {
//     return (
//       <button
//         className="button uppercase tracking-widest"
//         onClick={onClick}
//       >
//         {isHtmlEntity ? (
//           <span className='text-center pl-1 text-[20px] cursor-grab' dangerouslySetInnerHTML={{ __html: text }} />
//         ) : (
//           text
//         )}
//       </button>
//     );
//   }
// }

// Button.defaultProps = {
//   handleClick: () => { },
//   to: null
// };
import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export default function Button({ text, onClick, to }) {
  const isHtmlEntity = text.startsWith("&");

  if (to) {
    return (
      <Link to={to}>
        <button
          className="button uppercase tracking-wider whitespace-normal "
          onClick={onClick} style={{ fontFamily: "Genos" }}
        >
          {isHtmlEntity ? (
            <span className='text-center pl-1 ' dangerouslySetInnerHTML={{ __html: text }} />
          ) : (
            text
          )}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className="button uppercase tracking-widest  "
        onClick={onClick}
        style={{ fontFamily: "Genos" }}
      >
        {isHtmlEntity ? (
          <span className='text-center pl-1 text-[20px] ' dangerouslySetInnerHTML={{ __html: text }} />
        ) : (
          text
        )}
      </button>
    );
  }
}

Button.defaultProps = {
  handleClick: () => { },
  to: null
};
