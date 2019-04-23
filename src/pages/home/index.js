// import Vue from 'vue/dist/vue.min'
import 'fullpage.js/dist/fullpage.css'
import './style.less'
import Fullpage from 'fullpage.js'

/* eslint-disable */
let fullPageInstance = new Fullpage('#fullpage', {
  // licenseKey: 'YOUR_KEY_HERE',
  navigation: true,
  sectionsColor: ['#ff5f45', '#0798ec', '#fc6c7c', 'grey'],
  anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
  menu: '#menu',
})
