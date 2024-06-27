import { defineStore } from 'pinia';

export const useUI = defineStore('ui-store', {
  state: () => {
    return {
      drawerRight: false,
      footer: true,
      userLoggedIn: false
    };
  },
  actions: {
    setScrollPosition: (axis = 'vertical', offset = 0, duration = 0) => null,
    hiddenFooter() {
      this.footer = false;
    },
    showFooter() {
      this.footer = true;
    },
    onAuthUser() {
      this.userLoggedIn = true;
    },
    offAuthUser() {
      this.userLoggedIn = false;
    }
  }
});
