<template>
  <nav v-if="$route.query.index" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#">Senior Center Events</a>
      </li>
      <li
        v-if="location.data"
        class="breadcrumb-item active"
        aria-current="page"
      >
        {{ location.data.fields?.name }}
      </li>
    </ol>
  </nav>

  <div v-if="events.loading" class="text-center my-5">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else-if="events.data.length">
    <h1 v-if="location.data">{{ location.data.fields?.name }} Events</h1>

    <section v-for="{ id, fields } in events.data" :key="id" class="card my-3">
      <div class="card-body">
        <dl class="row">
          <!--  -->
          <dt class="col-sm-4 col-lg-3">Event Type</dt>
          <dd class="col-sm-8 col-lg-9">
            <span class="badge bg-secondary">{{ fields.Type }}</span>
          </dd>

          <!--  -->
          <dt class="col-sm-4 col-lg-3">Activity</dt>
          <dd class="col-sm-8 col-lg-9">
            {{ fields.Activity }}
          </dd>

          <!--  -->
          <dt class="col-sm-4 col-lg-3">Date/time</dt>
          <dd class="col-sm-8 col-lg-9">
            <mark>
              <span v-if="fields.DayNames && fields.Spanish">
                {{ fields.DayNamesSpanish.join(', ') }}
              </span>
              <span v-else-if="fields.DayNames">
                {{ fields.DayNames.join(', ') }}
              </span>

              <span v-if="fields.Date">
                {{ dateFormat(fields.Date) }}
              </span>

              <br />

              <span>{{ fields.StartTimeName.join(' ') }}</span>
              <span v-if="fields.EndTimeName">
                - {{ fields.EndTimeName.join(' ') }}
              </span>
            </mark>
          </dd>

          <!--  -->
          <dt class="col-sm-4 col-lg-3">Description</dt>
          <dd class="col-sm-8 col-lg-9" v-markdown="fields.Description"></dd>
        </dl>
      </div>
    </section>
  </div>

  <div v-else class="alert alert-info" role="alert">
    There are no events at this time.
  </div>
</template>

<script>
import { location, fetchLocation } from '../lib/locations'
import { events, fetchEvents } from '../lib/events'

const dateFormat = (dateStr) => {
  const [y, m, d] = dateStr.split('-')
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default {
  props: {
    UID: String,
  },

  setup(props) {
    fetchLocation(props.UID)
    fetchEvents(props.UID)

    return { location, events, dateFormat }
  },
}
</script>
