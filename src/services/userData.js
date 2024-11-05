import {defineStore} from "pinia";
export const useStore = defineStore('main', {
  state: () => ({
    responseData: null,
  }),
  actions: {
    setResponseData(data) {
      this.responseData = data
    },
  },
})
