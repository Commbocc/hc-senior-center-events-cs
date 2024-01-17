<template>
  <div v-if="locations.loading" class="text-center my-5">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else-if="locations.data.length" class="table-responsive">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Location</th>
          <th>Events</th>
          <th>Web Page</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, fields } in locations.data" :key="id">
          <td>
            {{ fields.name }}
          </td>
          <td>
            <router-link
              :title="`${fields.name} Events`"
              :aria-label="`${fields.name} Events`"
              target="_self"
              :to="{
                name: 'Location',
                params: { UID: fields.UID },
                query: { index: 1 },
              }"
              class=""
            >
              View Events
            </router-link>
          </td>
          <td>
            <a
              :title="`${fields.name} Web Page`"
              :aria-label="`${fields.name} Web Page`"
              target="_top"
              :href="fields.newUrl"
            >
              View Location's Web Page</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="alert alert-info" role="alert">
    No locations have events at this time.
  </div>
</template>

<script>
import { locations, fetchLocations } from '../lib/locations'

export default {
  setup() {
    fetchLocations()
    return { locations }
  },
}
</script>
