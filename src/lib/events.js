import { reactive } from 'vue'
import airtable from './airtable'

export const events = reactive({
  error: '',
  loading: false,
  data: [],
})

export async function fetchEvents(UID) {
  events.loading = true
  try {
    const { data } = await airtable.get(`/events`, {
      params: {
        filterByFormula: `AND({Published}, FIND('${UID}', ARRAYJOIN({LocationUID})))`,
        view: import.meta.env.DEV ? 'DevView' : 'AppView',
      },
    })

    events.data = data.records
  } catch (error) {
    // error
    // 401 unauth
    // 422 (Unprocessable Entity)

    events.error = error.message
  } finally {
    events.loading = false
  }
}
