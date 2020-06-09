//  import React from 'react';
//  import Loader from 'react-loader-spinner'
//  import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


//  export default class MyLoader extends React.Component {
//   //other logic
//     render() {
//      return(
//       <Loader
//          type="Puff"
//          color="#00BFFF"
//          height={100}
//          width={100}
//          timeout={3000} //3 secs
 
//       />
//      );
//     }
//  }


import React from 'react';
import { DisappearedLoading } from 'react-loadingg';

const MyLoader = () => <DisappearedLoading />;
export default MyLoader;