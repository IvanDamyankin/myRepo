/* eslint-disable no-console */
import axios from 'axios'

export const state = () => ({
  apps: [],
  selectedApp: null
})

export const actions = {
  async loadApps (context) {
    try {
      const { data } = await axios.get('http://localhost:5000/api/apps')
      context.commit('setApps', data)
    } catch (err) {
      console.error('Failed to load apps.')
      console.error(err)
    }
  },

  async loadAppDetails (context, appKey) {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/apps/${appKey}`)
      context.commit('setSelectedApp', data)
    } catch (err) {
      console.error(`Failed to load app details for app key: ${appKey}.`)
      console.error(err)
    }
  }
}

export const mutations = {
  setApps (state, apps) {
    state.apps = [...apps]
  },

  setSelectedApp (state, appDetails) {
    state.selectedApp = appDetails
  }
}
