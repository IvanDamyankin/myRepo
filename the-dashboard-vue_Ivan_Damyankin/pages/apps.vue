// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="d-flex flex-row">
    <v-card outlined shaped class="flex-grow-1 mr-2">
      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-left">Title</th>
              <th class="text-left">Users</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="app in apps" :key="app.key" @click="selectApp(app)">
              <td>{{ app.title }}</td>
              <td>{{ app.userCount }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <v-card outlined shaped class="flex-grow-1 mr-2">
      <div v-if="selectedApp" class="pa-2">
        <h2>{{ selectedApp.title }}</h2>
        <p>{{ selectedApp.description }}</p>
        <p>
          Users:
          <span
            :class="
              classByPercentage(selectedApp.totalUsers, selectedApp.userLimit)
            "
          >
            <p>
              {{ selectedApp.totalUsers }} out of {{ selectedApp.userLimit }}
            </p>
          </span>
        </p>
        <p>
          Usage:
          <span
            :class="
              classByPercentage(selectedApp.usage, selectedApp.usageLimit)
            "
          >
            <p>{{ selectedApp.usage }} out of {{ selectedApp.usageLimit }}</p>
          </span>
        </p>
      </div>
      <div v-else class="pa-2">
        <p>Select an app to view its details.</p>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async mounted () {
    await this.$store.dispatch('Apps/loadApps');
  },

  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapState('Apps', ['apps', 'selectedApp'])
  },

  methods: {
    async selectApp (app) {
      await this.$store.dispatch('Apps/loadAppDetails', app.key);
    },

    classByPercentage (value, limit) {
      const percentage = (value / limit) * 100
      if (percentage < 70) {
        return 'green'
      }
      if (percentage >= 70 && percentage <= 90) {
        return 'yellow'
      }
      return 'red'
    }
  }
}
</script>

<style scoped>
tbody tr {
  cursor: pointer;
}
.green {
  color: green;
  font-size: larger;
}
.yellow {
  color: yellow;
  font-size: larger;
}
.red {
  color: red;
  font-size: larger;
}
</style>
