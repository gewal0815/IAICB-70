import Main from './components/Main.vue';

const script = document.createElement('script');
script.type = 'module'; // add this line
script.type = 'text/javascript';
script.src = 'https://cdn.jsdelivr.net/npm/nuxt@3.0.0-0/dist/nuxt.min.js';
document.head.appendChild(script);


const MainComponent = {
  components: {
    Main,
  },
  template: `
    <div>
      <Main />
    </div>
  `,
};

nuxt.component('MainComponent', MainComponent);
