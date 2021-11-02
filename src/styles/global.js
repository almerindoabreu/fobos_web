import { createGlobalStyle } from "styled-components"
import Rationale_Regular from '../fonts/Rationale-Regular.ttf';
import Saros_Regular from '../fonts/saros-regular.ttf';

const GlobalStyles = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
  */

  /* HTML5 display-role reset for older browsers */

  .form-check-label{
    padding-top: 2px;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }
  body {
    background: #fff;
    line-height: 1;
    font-size: 100%;
    font-family: Roboto, BlinkMacSystemFont, "Segoe UI", -apple-system, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  img {
    display: block;
  	width: 100%;
  	height: auto;
  }

  @font-face {
        font-family: 'Rationale-Regular';
        src: local('Rationale-Regular'), url(${Rationale_Regular}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Saros-Regular';
        src: local('Saros-Regular'), url(${Saros_Regular}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }
`
export default GlobalStyles
