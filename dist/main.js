(()=>{"use strict";var e={245:(e,t,n)=>{function o(e){this.message=e}n.r(t),n.d(t,{InvalidTokenError:()=>a,default:()=>l}),o.prototype=new Error,o.prototype.name="InvalidCharacterError";var i="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new o("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,i,r=0,a=0,l="";i=t.charAt(a++);~i&&(n=r%4?64*n+i:i,r++%4)?l+=String.fromCharCode(255&n>>(-2*r&6)):0)i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i);return l};function r(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(i(e).replace(/(.)/g,(function(e,t){var n=t.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n})))}(t)}catch(e){return i(t)}}function a(e){this.message=e}a.prototype=new Error,a.prototype.name="InvalidTokenError";const l=function(e,t){if("string"!=typeof e)throw new a("Invalid token specified");var n=!0===(t=t||{}).header?0:1;try{return JSON.parse(r(e.split(".")[n]))}catch(e){throw new a("Invalid token specified: "+e.message)}}},363:function(e,t){var n=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function a(e){try{s(o.next(e))}catch(e){r(e)}}function l(e){try{s(o.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}s((o=o.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,o,i,r,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function l(r){return function(l){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(i=2&r[0]?o.return:r[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,r[1])).done)return i;switch(o=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,o=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==r[0]&&2!==r[0])){a=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){a.label=r[1];break}if(6===r[0]&&a.label<i[1]){a.label=i[1],i=r;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(r);break}i[2]&&a.ops.pop(),a.trys.pop();continue}r=t.call(e,a)}catch(e){r=[6,e],o=0}finally{n=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,l])}}};Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,i){var r=this;this.getDetails=function(){return n(r,void 0,void 0,(function(){return o(this,(function(e){return[2]}))}))},this.canClaimBenefit=function(){return!1},this.claim=function(){},this.open=function(){r.ui.openWallet("/benefit-details/".concat(r.id,"?client_id=").concat(r.session.clientId))},this.session=t,this.ui=i,this.id=e}},771:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,n){var o=this;this.getMyNFTs=function(){return[]},this.listNFTs=function(e){return[]},this.open=function(e,t){var n='/collection-details?filters={"collectionIds":["'.concat(o.id,'"]}&client_id=').concat(o.session.clientId);"NFT_LIST"===(null==t?void 0:t.uiState)&&(n='/marketplace/listings?filters={"collectionIds":["'.concat(o.id,'"]}&client_id=').concat(o.session.clientId)),o.ui.openWallet(n)},this.session=t,this.ui=n,this.id=e}},138:function(e,t,n){var o=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var o,i=0,r=t.length;i<r;i++)!o&&i in t||(o||(o=Array.prototype.slice.call(t,0,i)),o[i]=t[i]);return e.concat(o||Array.prototype.slice.call(t))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(363)),a=i(n(98)),l=i(n(119)),s=i(n(771)),c=i(n(281)),d=function(e){var t=this;this.eventHandlersMap={},this.handleEvent=function(e){var n=t.eventHandlersMap[e.event]||[];n.forEach((function(t){t.handler(e)})),t.eventHandlersMap[e.event]=n.filter((function(e){var t;return!(null===(t=e.options)||void 0===t?void 0:t.once)}))},this.openWallet=function(e){t.ui.openWallet(e)},this.close=function(){t.ui.close()},this.login=function(e){if((null==e?void 0:e.forced)||!t.session.isLoggedIn){var n=function(){t.off("LOGIN_SUCCESS",n),t.off("BEFORE_CLOSE",n),t.close()};t.on("LOGIN_SUCCESS",n,{once:!0}),t.on("BEFORE_CLOSE",n,{once:!0}),t.openWallet("/login?client_id=".concat(t.session.clientId))}},this.logout=function(e){if(null==e?void 0:e.clearUserSessionOnly)t.session.onLogout();else{var n=function(){t.off("CANCEL_LOGOUT",n),t.off("LOGOUT_SUCESS",n),t.off("BEFORE_CLOSE",n),t.close()};t.on("CANCEL_LOGOUT",n,{once:!0}),t.on("LOGOUT_SUCESS",n,{once:!0}),t.on("BEFORE_CLOSE",n,{once:!0}),t.openWallet("/profile?client_id=".concat(t.session.clientId,"&showLogoutSheet=true"))}},this.benefit=function(e){return new r.default(e,t.session,t.ui)},this.nft=function(e){return new l.default(e,t.session,t.ui)},this.listCollections=function(e){return[]},this.collection=function(e){return new s.default(e,t.session,t.ui)},this.openMyNfts=function(){t.openWallet("/nfts-list/own?client_id=".concat(t.session.clientId))},this.whitelist=function(e){t.openWallet("/login?client_id=".concat(t.session.clientId,"&whitelist=true"))},this.getSession=function(){return t.session},this.setClientId=function(e){t.session.clientId=e},this.on=function(e,n,i){var r=t.eventHandlersMap[e]||[];t.eventHandlersMap[e]=o(o([],r,!0),[{handler:n,options:i}],!1)},this.off=function(e,n){var o=t.eventHandlersMap[e]||[];t.eventHandlersMap[e]=o.filter((function(e){return e.handler!==n}))},this.session=new a.default,this.ui=new c.default((function(){t.handleEvent({event:"BEFORE_CLOSE",payload:{}})}),(function(){t.handleEvent({event:"OPEN",payload:{}})}),e),"undefined"!=typeof window&&(this.session.clientId=(null==e?void 0:e.client_id)||"",this.on("LOGIN_SUCCESS",(function(e){t.session.onLogin(e.payload.bearerToken,e.payload.walletAddress)})),this.on("LOGOUT_SUCESS",(function(){return t.session.onLogout()})),window.addEventListener("message",(function(e){try{if(e.origin!==t.ui.baseUrl)return;console.log("Received",e.data);var n=JSON.parse(e.data);if(!n.event)return;t.handleEvent(n)}catch(e){}})))};if("undefined"!=typeof window){var u=function(){window.Wallet=d};"complete"===document.readyState?u():window.attachEvent?window.attachEvent("onload",u):window.addEventListener("load",u,!1)}t.default=d},119:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,n){var o=this;this.getDetails=function(){},this.open=function(e){o.ui.openWallet("/nft-details/".concat(o.id,"?client_id=").concat(o.session.clientId))},this.session=t,this.ui=n,this.id=e}},98:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=o(n(245)),r=function(){function e(){this.onLogin=function(t,n){var o,i;void 0===n&&(n={}),null===(o=e.getStorage())||void 0===o||o.setItem(e.bearerTokenKey,t),null===(i=e.getStorage())||void 0===i||i.setItem(e.addressKey,JSON.stringify(n))},this.onLogout=function(){var t;null===(t=e.getStorage())||void 0===t||t.removeItem(e.bearerTokenKey)}}return Object.defineProperty(e.prototype,"isLoggedIn",{get:function(){var t,n=null===(t=e.getStorage())||void 0===t?void 0:t.getItem(e.bearerTokenKey);if(!n)return!1;var o=(0,i.default)(n),r=Date.now()/1e3;return(o&&(null==o?void 0:o.exp))>r},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"clientId",{get:function(){var t;return(null===(t=e.getStorage())||void 0===t?void 0:t.getItem(e.clientIdKey))||"default"},set:function(t){var n;null===(n=e.getStorage())||void 0===n||n.setItem(e.clientIdKey,t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bearerToken",{get:function(){var t;return null===(t=e.getStorage())||void 0===t?void 0:t.getItem(e.bearerTokenKey)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"chainAddress",{get:function(){var t,n=null===(t=e.getStorage())||void 0===t?void 0:t.getItem(e.addressKey);return n?JSON.parse(n):{}},enumerable:!1,configurable:!0}),e.bearerTokenKey="ms-bearer-token",e.clientIdKey="ms-client-id",e.addressKey="ms-chain-address",e.getStorage=function(){if("undefined"!=typeof window)return localStorage},e}();t.default=r},281:function(e,t){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},n.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(t,o,i){var r=this;this.baseUrl="http://localhost:3000",this.portalId="",this.iframeId="",this.injectPortal=function(){if(!document.getElementById(r.portalId)){var e=document.createElement("style");e.innerHTML="\n            #".concat(r.portalId," .close-container {\n                min-width: 315px;\n                max-width: 428px;\n                width: 100%;\n                position: fixed;\n                left: 50%;\n                right: 50%;\n                transform: translateX(-50%);\n                -webkit-box-align: center;\n                align-items: center;\n                -webkit-box-pack: end;\n                justify-content: flex-end;\n                background-color: rgb(204, 213, 236);\n                z-index: 100;\n                height: 40px;\n                font-size: 14px;\n                font-weight: 700;\n                color: rgb(46, 54, 72);\n                cursor: pointer;\n                display: flex !important;\n            }\n            #").concat(r.portalId," .close-icon {\n                width: 20px;\n                height: 20px;\n                padding: 0px;\n                margin: 10px;\n                pointer-events: all;\n                color: black;\n                font-size: 12px;\n                font-weight: 600;\n                z-index: 9;\n                background-color: rgb(253, 215, 63);\n                border: 0px;\n                cursor: pointer;\n                border-radius: 100% !important;\n            }\n            #").concat(r.portalId," .iframe {\n                height: 926px;\n                max-width: 428px;\n                min-width: 375px;\n                width: 100%;\n                position: fixed;\n                left: 50%;\n                right: 50%;\n                -webkit-transform: translateX(-50%);\n                -moz-transform: translateX(-50%);\n                -ms-transform: translateX(-50%);\n                transform: translateX(-50%);\n                z-index: 99;\n                background-color: #e6eaf0;\n                padding-top: 2.5rem;\n                max-height: 90vh;        \n            }\n            @media (max-width: 429px) {\n                #").concat(r.portalId," .iframe {\n                    height: 100%;\n                    max-height: 100vh;  \n                }\n            }\n            #").concat(r.portalId," .overlay {\n                position: fixed;\n                display: block;\n                width: 100%;\n                height: 100%;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                background-color: rgba(0, 0, 0, 0.5);\n                z-index: 90;\n                cursor: pointer;\n                -webkit-backdrop-filter: blur(20px);\n                backdrop-filter: blur(20px);\n            }\n            #").concat(r.portalId," {\n                display: none;\n                position: fixed;\n                left: 0;\n                right: 0;\n                top: 0;\n                bottom: 0;\n                z-index: 88;        \n            }\n        "),document.head.appendChild(e);var t=document.createElement("div");t.setAttribute("id",r.portalId);var n=document.createElement("iframe");n.setAttribute("src",""),n.setAttribute("frameborder","0"),n.setAttribute("allowFullScreen","true"),n.setAttribute("allow",Object.keys(r.walletPermissions).filter((function(e){return r.walletPermissions[e]})).join(";")),n.setAttribute("class","iframe"),n.setAttribute("id",r.iframeId);var o=document.createElement("div");o.setAttribute("class","overlay");var i=document.createElement("div");i.setAttribute("class","close-container"),i.onclick=r.close;var a=document.createElement("span");a.innerHTML="Close";var l=document.createElement("button");l.innerHTML="X",l.setAttribute("class","close-icon"),i.appendChild(a),i.appendChild(l),t.appendChild(i),t.appendChild(n),t.appendChild(o),document.body.appendChild(t)}},this.openWallet=function(e){var t,n;void 0===e&&(e=""),null===(t=document.getElementById(r.iframeId))||void 0===t||t.setAttribute("src","".concat(r.baseUrl).concat(e)),null===(n=document.getElementById(r.portalId))||void 0===n||n.setAttribute("style","display: block;"),r.onOpen()},this.close=function(){var e,t;null===(e=document.getElementById(r.iframeId))||void 0===e||e.setAttribute("src",""),null===(t=document.getElementById(r.portalId))||void 0===t||t.setAttribute("style",""),r.onClose()},this.onClose=t,this.onOpen=o,this.walletPermissions=n({camera:!0,"clipboard-read":!0,"clipboard-write":!0,microphone:!0},(null==i?void 0:i.permission)||{}),this.portalId=e.generatePortalId(),this.iframeId="".concat(this.portalId,"-iframe"),"undefined"!=typeof window&&this.injectPortal()}return e.generateRandomnString=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=n.length,i=0;i<e;i++)t+=n.charAt(Math.floor(Math.random()*o));return t},e.generatePortalId=function(){return"skywallet-".concat(e.generateRandomnString(10))},e}();t.default=o}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,n),r.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(138)})();