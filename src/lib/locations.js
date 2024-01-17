import { reactive } from 'vue'
import airtable from './airtable'

export const locations = reactive({
  error: '',
  loading: false,
  data: [],
})

export async function fetchLocations() {
  locations.loading = true
  try {
    const { data } = await airtable.get(`/locations`, {
      params: {
        view: import.meta.env.DEV ? 'DevView' : 'AppView',
      },
    })
    locations.data = data.records
  } catch (error) {
    locations.error = error.message
  } finally {
    locations.loading = false
  }
}

//
export const location = reactive({
  error: '',
  loading: false,
  data: null,
})

export async function fetchLocation(LocationUID) {
  location.loading = true
  try {
    const { data } = await airtable.get(`/locations`, {
      params: {
        filterByFormula: `ARRAYJOIN({LocationUID}) = '${UID}'`,
        view: import.meta.env.DEV ? 'DevView' : 'AppView',
      },
    })
    location.data = data.records[0]
  } catch (error) {
    location.error = error.message
  } finally {
    location.loading = false
  }
}
