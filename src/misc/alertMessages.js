export const alertMessages = {

  PASSWORDS_NO_MATCH: {
    message: 'Passordet stemmer ikke!',
    type: 'error'
  },
  INVALID_PASSWORD: {
    message: 'Passordet er ugyldig!',
    type: 'error'
  },
  INVALID_CREDENTIALS: {
    message: 'Brukernavn eller passord er feil!',
    type: 'error'
  },
  UPDATE_SUCCESS: {
    message: 'Oppdatering vellykket!',
    type: 'success'
  },
  UPDATE_FAILURE: {
    message: 'Oppdatering mislyktes! Prøv igjen senere.',
    type: 'error'
  },
  GET_MSG_FAILURE: {
    message: 'Innhenting av meldinger mislyktes! Prøv igjen senere.',
    type: 'error'
  },
  ADD_MSG_FAILURE: {
    message: 'Message could not be sent. Please try again later.',
    type: 'error'
  },
  NO_USER_POSTS: {
    message: 'Ingen innlegg enda! Skriv historiene dine, så ser du dem her.'
  },
  NO_FAVORITE_POSTS: {
    message: 'Oops! \nDu har ingen favoritt historier enda. Merk historier som favoritter, og du vil se dem her.'
  },
  DELETE_POST_CONFIRM: {
    header: 'Bekreft fjerningen',
    message: 'Er du sikker på at du vil fjerne denne historien?'
  },
  DELETE_USER_CONFIRM: {
    header: 'Confirm removal',
    message: 'Er du sikker på at du vil fjerne denne brukeren?'
  },
  NO_USER_MESSAGES: {
    message: 'Ingen meldinger enda! \nVelg “send melding” fra historien hvis du ønsker å kontakte forfatteren.'
  }
}